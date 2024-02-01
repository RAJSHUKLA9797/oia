const cron = require("node-cron");
const mongoose = require("mongoose");
const Task = require("./schemas/task");
const User = require("./schemas/user");

const twilio = require("twilio");
const accountSid = "your_twilio_account_sid";
const authToken = "your_twilio_auth_token";
// const client = twilio(accountSid, authToken);

//twilio call feature
async function makeVoiceCall(phoneNumber) {
  try {
    const call = await client.calls.create({
      to: phoneNumber,
      from: "your_twilio_phone_number",
      url: "http://example.com/voice.xml", // URL to TwiML document for call handling
    });

    console.log(`Call initiated to ${phoneNumber}: ${call.sid}`);
    return true; // Call initiated successfully
  } catch (error) {
    console.error(`Error initiating call to ${phoneNumber}:`, error);
    return false; // Call initiation failed
  }
}

exports.cronjobs = async () => {
  try {
    // Find tasks that need priority updates
    const tasksToUpdate = await Task.find({});

    // Update task priorities based on due_date
    tasksToUpdate.forEach(async (task) => {
      const currentDate = new Date();
      const dueDate = new Date(task.dueDate);
      const daysDifference = Math.floor(
        (dueDate - currentDate) / (1000 * 60 * 60 * 24)
      );

      let updatedPriority;
      if (task.status != "DONE") {
        if (daysDifference < 0) {
          //call the user on priority
          const usersToCall = await User.find().sort({ priority: 1 });

          for (const user of usersToCall) {
            const callInitiated = await makeVoiceCall(user.phone_number);
            if (callInitiated) {
              //if call connected dont call any further
              break;
            }
          }
          await Task.findByIdAndDelete(task._id);
        } else if (daysDifference === 0) {
          updatedPriority = 0;
        } else if (daysDifference === 1 || daysDifference === 2) {
          updatedPriority = 1;
        } else if (daysDifference >= 3 && daysDifference <= 4) {
          updatedPriority = 2;
        } else {
          updatedPriority = 3;
        }
      } else {
        await Task.findByIdAndDelete(task._id);
      }
      // Update task priority in the database
      await Task.findByIdAndUpdate(task._id, { priority: updatedPriority });
    });

    console.log("Task priorities updated successfully.");
  } catch (error) {
    console.error("Error updating task priorities:", error);
  }
};

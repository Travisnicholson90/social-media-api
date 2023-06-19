const connection = require('../config/connection');
const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');


// Create a function to seed the database
connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('MongoDB connection established!');

    // Delete existing data
    await User.deleteMany();
    await Thought.deleteMany();

    // Create dummy users
    const user1 = await User.create({ username: 'AmyJones21', email: 'user1@example.com' });
    const user2 = await User.create({ username: 'Beth1990', email: 'user2@example.com' });

    // create dummy friends as a subdocument to user
    const friend1 = await User.create({ username: 'AlexAllen422', email: 'AlexAllen@hotmail.com'
    });
    const friend2 = await User.create({ username: 'BenThomas1990', email: 'benThom@gmail.com'
    });
    // Create dummy thoughts with reactions as subdocuments
    const thought1 = await Thought.create({
    thoughtText: 'Thoughts are the words of our minds',
    username: 'AmyJones21',
    reactions: [
        { reactionBody: 'Oh thats cool', username: 'Beth1990' },
        { reactionBody: 'Great thought', username: 'AmyJones21' }
    ]
    });

    const thought2 = await Thought.create({
    thoughtText: 'I think therefore I am - Descartes',
    username: 'Beth1990',
    reactions: [
        { reactionBody: 'Totally agree', username: 'AmyJones21' },
        { reactionBody: 'Very true', username: 'Beth1990' }
    ]
    });


    // Assign friends to users
    user1.friends.push(friend1._id);
    user2.friends.push(friend2._id);
        
    // Assign thoughts to users
    user1.thoughts.push(thought1);
    user2.thoughts.push(thought2);

      // Save the changes
      await user1.save();
      await user2.save();
  
      console.log('Database seeded successfully!');
      // Close the database connection
      process.exit(0);
    }
);

  
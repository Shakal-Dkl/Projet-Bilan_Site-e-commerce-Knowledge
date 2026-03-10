const { connectDatabase, disconnectDatabase, clearDatabase } = require('../config/database');
const User = require('./User');
const Theme = require('./Theme');
const Curriculum = require('./Curriculum');
const Lesson = require('./Lesson');
const Purchase = require('./Purchase');
const LessonProgress = require('./LessonProgress');
const Certification = require('./Certification');

module.exports = {
  connectDatabase,
  disconnectDatabase,
  clearDatabase,
  User,
  Theme,
  Curriculum,
  Lesson,
  Purchase,
  LessonProgress,
  Certification
};

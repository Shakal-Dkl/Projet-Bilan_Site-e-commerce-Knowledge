const bcrypt = require('bcryptjs');
const { sequelize, Theme, Curriculum, Lesson, User } = require('../models');

const catalog = [
  {
    theme: 'Musique',
    curriculums: [
      {
        title: 'Cursus d’initiation à la guitare',
        price: 50,
        lessons: [
          { title: 'Découverte de l’instrument', price: 26 },
          { title: 'Les accords et les gammes', price: 26 }
        ]
      },
      {
        title: 'Cursus d’initiation au piano',
        price: 50,
        lessons: [
          { title: 'Découverte de l’instrument', price: 26 },
          { title: 'Les accords et les gammes', price: 26 }
        ]
      }
    ]
  },
  {
    theme: 'Informatique',
    curriculums: [
      {
        title: 'Cursus d’initiation au développement web',
        price: 60,
        lessons: [
          { title: 'Les langages Html et CSS', price: 32 },
          { title: 'Dynamiser votre site avec Javascript', price: 32 }
        ]
      }
    ]
  },
  {
    theme: 'Jardinage',
    curriculums: [
      {
        title: 'Cursus d’initiation au jardinage',
        price: 30,
        lessons: [
          { title: 'Les outils du jardinier', price: 16 },
          { title: 'Jardiner avec la lune', price: 16 }
        ]
      }
    ]
  },
  {
    theme: 'Cuisine',
    curriculums: [
      {
        title: 'Cursus d’initiation à la cuisine',
        price: 44,
        lessons: [
          { title: 'Les modes de cuisson', price: 23 },
          { title: 'Les saveurs', price: 23 }
        ]
      },
      {
        title: 'Cursus d’initiation à l’art du dressage culinaire',
        price: 48,
        lessons: [
          { title: 'Mettre en œuvre le style dans l’assiette', price: 26 },
          { title: 'Harmoniser un repas à quatre plats', price: 26 }
        ]
      }
    ]
  }
];

async function seed() {
  await sequelize.sync({ force: true });

  for (const themeData of catalog) {
    const theme = await Theme.create({ name: themeData.theme, createdBy: 'seed', updatedBy: 'seed' });
    for (const cursusData of themeData.curriculums) {
      const curriculum = await Curriculum.create({
        title: cursusData.title,
        price: cursusData.price,
        description: 'Lorem ipsum cursus description',
        themeId: theme.id,
        createdBy: 'seed',
        updatedBy: 'seed'
      });

      for (const lessonData of cursusData.lessons) {
        await Lesson.create({
          title: lessonData.title,
          price: lessonData.price,
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          curriculumId: curriculum.id,
          createdBy: 'seed',
          updatedBy: 'seed'
        });
      }
    }
  }

  const adminHash = await bcrypt.hash('Admin1234', 10);
  await User.create({
    email: 'admin@knowledge.local',
    passwordHash: adminHash,
    firstName: 'Admin',
    lastName: 'Knowledge',
    role: 'admin',
    isActive: true,
    createdBy: 'seed',
    updatedBy: 'seed'
  });

  console.log('Seed completed successfully.');
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

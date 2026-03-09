const bcrypt = require('bcryptjs');
const { sequelize, Theme, Curriculum, Lesson, User } = require('../models');

const catalog = [
  {
    theme: 'Musique',
    displayOrder: 1,
    curriculums: [
      {
        title: 'Cursus d’initiation à la guitare',
        displayOrder: 1,
        price: 50,
        lessons: [
          { title: 'Découverte de l’instrument', displayOrder: 1, price: 26 },
          { title: 'Les accords et les gammes', displayOrder: 2, price: 26 }
        ]
      },
      {
        title: 'Cursus d’initiation au piano',
        displayOrder: 2,
        price: 50,
        lessons: [
          { title: 'Découverte de l’instrument', displayOrder: 1, price: 26 },
          { title: 'Les accords et les gammes', displayOrder: 2, price: 26 }
        ]
      }
    ]
  },
  {
    theme: 'Informatique',
    displayOrder: 2,
    curriculums: [
      {
        title: 'Cursus d’initiation au développement web',
        displayOrder: 1,
        price: 60,
        lessons: [
          { title: 'Les langages Html et CSS', displayOrder: 1, price: 32 },
          { title: 'Dynamiser votre site avec Javascript', displayOrder: 2, price: 32 }
        ]
      }
    ]
  },
  {
    theme: 'Jardinage',
    displayOrder: 3,
    curriculums: [
      {
        title: 'Cursus d’initiation au jardinage',
        displayOrder: 1,
        price: 30,
        lessons: [
          { title: 'Les outils du jardinier', displayOrder: 1, price: 16 },
          { title: 'Jardiner avec la lune', displayOrder: 2, price: 16 }
        ]
      }
    ]
  },
  {
    theme: 'Cuisine',
    displayOrder: 4,
    curriculums: [
      {
        title: 'Cursus d’initiation à la cuisine',
        displayOrder: 1,
        price: 44,
        lessons: [
          { title: 'Les modes de cuisson', displayOrder: 1, price: 23 },
          { title: 'Les saveurs', displayOrder: 2, price: 23 }
        ]
      },
      {
        title: 'Cursus d’initiation à l’art du dressage culinaire',
        displayOrder: 2,
        price: 48,
        lessons: [
          { title: 'Mettre en œuvre le style dans l’assiette', displayOrder: 1, price: 26 },
          { title: 'Harmoniser un repas à quatre plats', displayOrder: 2, price: 26 }
        ]
      }
    ]
  }
];

async function seed() {
  await sequelize.sync({ force: true });

  for (const themeData of catalog) {
    const theme = await Theme.create({
      name: themeData.theme,
      displayOrder: themeData.displayOrder,
      createdBy: 'seed',
      updatedBy: 'seed'
    });
    for (const cursusData of themeData.curriculums) {
      const curriculum = await Curriculum.create({
        title: cursusData.title,
        displayOrder: cursusData.displayOrder,
        price: cursusData.price,
        description: 'Lorem ipsum cursus description',
        themeId: theme.id,
        createdBy: 'seed',
        updatedBy: 'seed'
      });

      for (const lessonData of cursusData.lessons) {
        await Lesson.create({
          title: lessonData.title,
          displayOrder: lessonData.displayOrder,
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

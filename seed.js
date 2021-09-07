const { green, red } = require("chalk");
const { db } = require("./server/db");
const { Campus, Student } = require("./server/db");

const Campuses = [
  {
    name: "Harvard",
    imageUrl:
      "https://media.designrush.com/inspirations/129681/conversions/_1523543112_460_harvard-preview.jpg",
    address: "Cambridge, MA",
    description:
      "Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Founded in 1636 as Harvard College and named for its first benefactor, the Puritan clergyman John Harvard, it is the oldest institution of higher learning in the United States and among the most prestigious in the world. ",
  },
  {
    name: "Yale",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Yale_Bulldogs_logo.svg/1200px-Yale_Bulldogs_logo.svg.png",
    address: "New Haven, CT 06520",
    description:
      "Yale University is a private Ivy League research university in New Haven, Connecticut. Founded in 1701 as the Collegiate School, it is the third-oldest institution of higher education in the United States and one of the nine Colonial Colleges chartered before the American Revolution",
  },
  {
    name: "Penn State",
    imageUrl: "https://standard.psu.edu/images/uploads/psu-mark.svg",
    address: "State College, PA 16801",
    description:
      "The Pennsylvania State University is a public state-related land-grant research university with campuses and facilities throughout Pennsylvania. Founded in 1855 as the Farmers' High School of Pennsylvania, Penn State became the state's only land-grant university in 1863.",
  },
];

const Students = [
  {
    firstName: "Apollos",
    lastName: "Severe",
    email: "severeapollos@gmail.com",
    imageUrl:
      "https://media-exp1.licdn.com/dms/image/C4E03AQGxPHQHJvwwSg/profile-displayphoto-shrink_400_400/0/1580405274468?e=1635984000&v=beta&t=8Le7d5vGkjj94dxp51QVlZUn7rfuRKtYI_B0zD7EqNs",
    gpa: 4.0,
    campusId: 1,
  },
  {
    firstName: "Alexandria",
    lastName: "Baez",
    email: "alexlily@gmail.com",
    imageUrl:
      "https://www.seekpng.com/png/detail/57-576692_wattpad-random-a-bunch-of-pngs-for-people.png",
    gpa: 4.0,
    campusId: 1,
  },
  {
    firstName: "Lebron",
    lastName: "James",
    email: "thegoat@gmail.com",
    imageUrl:
      "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png",
    gpa: 3.6,
    campusId: 3,
  },
  {
    firstName: "Lauren",
    lastName: "London",
    email: "laurylove@gmail.com",
    imageUrl:
      "https://cdn.vox-cdn.com/thumbor/FuFZhV3rMZJHeo4PaaTqMwHlIA4=/0x0:1280x720/1200x800/filters:focal(532x148:736x352)/cdn.vox-cdn.com/uploads/chorus_image/image/68798983/NEXLJZ4ASZGDRJNPPIHBN6MLRE.0.jpg",
    gpa: 3.9,
    campusId: 1,
  },
  {
    firstName: "Apollos",
    lastName: "Severe",
    email: "severeapollos@gmail.com",
    imageUrl:
      "https://media-exp1.licdn.com/dms/image/C4E03AQGxPHQHJvwwSg/profile-displayphoto-shrink_400_400/0/1580405274468?e=1635984000&v=beta&t=8Le7d5vGkjj94dxp51QVlZUn7rfuRKtYI_B0zD7EqNs",
    gpa: 4.0,
    campusId: 3,
  },
  {
    firstName: "Apollos",
    lastName: "Severe",
    email: "severeapollos@gmail.com",
    imageUrl:
      "https://media-exp1.licdn.com/dms/image/C4E03AQGxPHQHJvwwSg/profile-displayphoto-shrink_400_400/0/1580405274468?e=1635984000&v=beta&t=8Le7d5vGkjj94dxp51QVlZUn7rfuRKtYI_B0zD7EqNs",
    gpa: 4.0,
    campusId: 2,
  },
  {
    firstName: "Apollos",
    lastName: "Severe",
    email: "severeapollos@gmail.com",
    imageUrl:
      "https://media-exp1.licdn.com/dms/image/C4E03AQGxPHQHJvwwSg/profile-displayphoto-shrink_400_400/0/1580405274468?e=1635984000&v=beta&t=8Le7d5vGkjj94dxp51QVlZUn7rfuRKtYI_B0zD7EqNs",
    gpa: 4.0,
    campusId: 2,
  },
  {
    firstName: "Apollos",
    lastName: "Severe",
    email: "severeapollos@gmail.com",
    imageUrl:
      "https://media-exp1.licdn.com/dms/image/C4E03AQGxPHQHJvwwSg/profile-displayphoto-shrink_400_400/0/1580405274468?e=1635984000&v=beta&t=8Le7d5vGkjj94dxp51QVlZUn7rfuRKtYI_B0zD7EqNs",
    gpa: 4.0,
    campusId: 2,
  },
  {
    firstName: "Apollos",
    lastName: "Severe",
    email: "severeapollos@gmail.com",
    imageUrl:
      "https://media-exp1.licdn.com/dms/image/C4E03AQGxPHQHJvwwSg/profile-displayphoto-shrink_400_400/0/1580405274468?e=1635984000&v=beta&t=8Le7d5vGkjj94dxp51QVlZUn7rfuRKtYI_B0zD7EqNs",
    gpa: 4.0,
    campusId: 3,
  },
  {
    firstName: "Apollos",
    lastName: "Severe",
    email: "severeapollos@gmail.com",
    imageUrl:
      "https://media-exp1.licdn.com/dms/image/C4E03AQGxPHQHJvwwSg/profile-displayphoto-shrink_400_400/0/1580405274468?e=1635984000&v=beta&t=8Le7d5vGkjj94dxp51QVlZUn7rfuRKtYI_B0zD7EqNs",
    gpa: 4.0,
    campusId: 2,
  },
  {
    firstName: "Apollos",
    lastName: "Severe",
    email: "severeapollos@gmail.com",
    imageUrl:
      "https://media-exp1.licdn.com/dms/image/C4E03AQGxPHQHJvwwSg/profile-displayphoto-shrink_400_400/0/1580405274468?e=1635984000&v=beta&t=8Le7d5vGkjj94dxp51QVlZUn7rfuRKtYI_B0zD7EqNs",
    gpa: 4.0,
    campusId: 2,
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    // seed your database here!
    await Promise.all(Campuses.map((campus) => Campus.create(campus)));
    await Promise.all(Students.map((student) => Student.create(student)));
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));

      db.close();
    })
    .catch((err) => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}

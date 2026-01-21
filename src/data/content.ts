export const siteConfig = {
  name: "SABMA",
  fullName: "South African Black Mastiff Association",
  description:
    "The South African Black Mastiff Association (SABMA) is an organization for breeders of black mastiffs in South Africa. Established to promote responsible breeding and uphold the standards of the black mastiff breed, SABMA focuses on a community of enthusiasts who share a passion for these dogs.",
  phone: "+27 72 454 3278",
  whatsapp: "+27724543278", // WhatsApp number without spaces/dashes for API
  email: "sabmaoffice@gmail.com",
  address: "South Africa",
  // TODO: Update these with actual social media URLs when available
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100063607498498",
    instagram: "", // Set to empty string until official account is ready // Update with actual Instagram URL
  },
};

export const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "The Council", href: "/council" },
  { name: "Breeders", href: "/breeders" },
  { name: "Stud Register", href: "/stud-register" },
  { name: "Resources", href: "/resources" },
  { name: "Buying a Puppy", href: "/buying-a-puppy" },
  { name: "Calendar", href: "/calendar" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact Us", href: "/contact" },
];

export const councilMembers = [
  {
    id: 1,
    name: "Chris Boshoff",
    role: "Chairman",
    email: "nyamvubucontracting@gmail.com",
    phone: "+27 82 565 6105",
    image: "/images/council/chairman.jpg",
  },
  {
    id: 2,
    name: "Jaco Venter",
    role: "Vice Chairman",
    email: "jacoventer59@gmail.com",
    phone: "+27 79 801 8304",
    image: "/images/council/vice-chairman.jpg",
  },
  {
    id: 3,
    name: "Alfred White",
    role: "Board Member - Free State",
    email: "alfred@alro.co.za",
    phone: "+27 72 991 0176",
    image: "/images/council/board-member-fs.jpg",
  },
  {
    id: 4,
    name: "Thabang Phokojoe",
    role: "Regional Representative - Gauteng",
    email: "",
    phone: "+27 71 138 0666",
    image: "/images/council/regional-rep.jpg",
  },
  {
    id: 5,
    name: "Corrie Nieuwoudt",
    role: "Office Manager",
    email: "sabmaoffice@gmail.com",
    phone: "+27 72 454 3278",
    image: "/images/council/office-manager.jpg",
  },
  {
    id: 6,
    name: "Chris Boshoff",
    role: "Senior Appraiser",
    email: "nyamvubucontracting@gmail.com",
    phone: "+27 82 565 6105",
    image: "/images/council/appraiser-1.jpg",
  },
  {
    id: 7,
    name: "Kobus Nieuwoudt",
    role: "Senior Appraiser",
    email: "kobcosolutions@gmail.com",
    phone: "+27 71 217 8689",
    image: "/images/council/appraiser-2.jpg",
  },
];

export const breeders = [
  {
    id: 1,
    name: "Black Legend",
    kennel: "Black Legend Kennel",
    owners: "Alfred & Izane White",
    location: "Virginia, Free State",
    phone: "+27 72 991 0176",
    email: "alfred@alro.co.za",
    image: "/images/breeders/breeder-banner-2.png",
  },
  {
    id: 2,
    name: "Infinity Ark",
    kennel: "Infinity Ark Kennel",
    owners: "Ingo de Nobrega",
    location: "South Africa",
    phone: "",
    email: "",
    image: "/images/breeders/breeder-banner-3.png",
  },
  {
    id: 3,
    name: "Maxabel",
    kennel: "Maxabel Kennel",
    owners: "Louwrens & Elaine de Jager",
    location: "Bethlehem, Free State",
    phone: "+27 82 857 3398",
    email: "louwrensdejager1@gmail.com",
    image: "/images/breeders/maxabel.jpg",
  },
  {
    id: 4,
    name: "Mnumzane",
    kennel: "Mnumzane Kennel",
    owners: "Jaco & Zelda Venter",
    location: "Donnybrook, KwaZulu-Natal",
    phone: "+27 79 801 8304",
    email: "jacoventer59@gmail.com",
    image: "/images/breeders/mnumzane.jpg",
  },
  {
    id: 5,
    name: "Nyamvubu",
    kennel: "Nyamvubu Black Mastiffs",
    owners: "Chris Boshoff",
    location: "South Africa",
    phone: "+27 82 565 6105",
    email: "nyamvubucontracting@gmail.com",
    image: "/images/breeders/nyamvubu.jpg",
  },
];

export const studDogs = [
  {
    id: 1,
    name: "Nyamvubu Titan",
    lineage: "Nyamvubu Jors X Maxabel Tofinia",
    status: "SILVER",
    image: "/images/studs/stud-1.png",
  },
  {
    id: 2,
    name: "Nyamvubu Ruby",
    lineage: "Nyamvubu Jors X Nyamvubu Stella",
    status: "SILVER",
    image: "/images/studs/stud-2.png",
  },
  {
    id: 3,
    name: "Nyamvubu Jors",
    lineage: "Nyamvubu Chrisjan X Nyamvubu Sandra",
    status: "SILVER",
    image: "/images/dogs/mastiff-sitting.jpg",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Marlize M.",
    quote:
      "We are the happy Mom and Dad of 2 wonderful SA Black Mastiffs. Our eldest is now 9 and a 1/2 years old and our young male will be 3 years old in September. I will never get another breed of large dog again. These dogs are just superbly bred. They have the most beautiful temperament and have no health problems.",
    image: "/images/testimonials/marlize.jpg",
  },
  {
    id: 2,
    name: "Robert F.",
    quote:
      "My observation of the breed is that they make a perfect family protection dog with a strong prey drive. My newly acquired black male, Titan, is loyal to the core, always upbeat in nature and always greets with vigorous wags. Not a dog for anyone with a weak disposition though, because of their size and great strength, they do need firm training.",
    image: "/images/testimonials/robert.jpg",
  },
  {
    id: 3,
    name: "David L.",
    quote:
      "As a breeder, SABMA has provided me with valuable resources and support. I am proud to be a member of this association and to be a part of the black mastiff community.",
    image: "/images/testimonials/david.jpg",
  },
];

export const membershipBenefits = [
  {
    title: "Breeder Directory",
    description:
      "Our breeder directory is a valuable resource for anyone looking to add a black mastiff to their family. Our members are dedicated to breeding healthy and well-socialized puppies that conform to the breed standard.",
    icon: "directory",
  },
  {
    title: "Educational Resources",
    description:
      "As a member of SABMA, you will have access to a range of benefits including educational resources, networking opportunities, and more.",
    icon: "education",
  },
  {
    title: "Events & Appraisals",
    description:
      "SABMA hosts a range of events throughout the year, including appraisals, and seminars. These events provide opportunities for black mastiff enthusiasts to come together, share knowledge, and celebrate the breed.",
    icon: "events",
  },
  {
    title: "Community Support",
    description:
      "Join a passionate community of like-minded enthusiasts who share your love for these magnificent dogs and are committed to their welfare.",
    icon: "community",
  },
];

import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create super admin user
  const adminPassword = await hash(process.env.ADMIN_PASSWORD || 'change-me-in-production', 12)

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@sabma.org' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@sabma.org',
      name: 'SABMA Admin',
      password: adminPassword,
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  })

  console.log('Created admin user:', admin.email)

  // Create sample kennels
  const kennel1 = await prisma.kennel.upsert({
    where: { name: 'Lion Heart Kennels' },
    update: {},
    create: {
      name: 'Lion Heart Kennels',
      breederName: 'John Smith',
      country: 'South Africa',
      city: 'Johannesburg',
      region: 'Gauteng',
      contactEmail: 'lionheart@example.com',
      contactPhone: '+27 11 123 4567',
      description: 'Dedicated to breeding quality South African Black Mastiffs since 2010.',
      active: true,
    },
  })

  const kennel2 = await prisma.kennel.upsert({
    where: { name: 'Protector Boerboels' },
    update: {},
    create: {
      name: 'Protector Boerboels',
      breederName: 'Sarah Johnson',
      country: 'South Africa',
      city: 'Cape Town',
      region: 'Western Cape',
      contactEmail: 'protector@example.com',
      contactPhone: '+27 21 987 6543',
      description: 'Family-run kennel focused on health and temperament.',
      active: true,
    },
  })

  console.log('Created kennels:', kennel1.name, kennel2.name)

  // Create foundation dogs (parents)
  const sire1 = await prisma.dog.upsert({
    where: { registrationNumber: 'SABMA-2019-001' },
    update: {},
    create: {
      registeredName: 'Maximus Van Lion Heart',
      registrationNumber: 'SABMA-2019-001',
      microchipNumber: '985141000123456',
      sex: 'MALE',
      dateOfBirth: new Date('2019-03-15'),
      color: 'Fawn',
      status: 'BREEDING',
      kennelId: kennel1.id,
      breederName: 'John Smith',
      currentOwner: 'John Smith',
      registryName: 'SABMA',
      registrationType: 'STUDBOOK',
      appraisalScore: 88.5,
      appraisalClassification: 'Excellent',
      dnaVerified: true,
      hipScore: 'A',
      elbowScore: '0',
    },
  })

  const dam1 = await prisma.dog.upsert({
    where: { registrationNumber: 'SABMA-2019-002' },
    update: {},
    create: {
      registeredName: 'Bella of Lion Heart',
      registrationNumber: 'SABMA-2019-002',
      microchipNumber: '985141000123457',
      sex: 'FEMALE',
      dateOfBirth: new Date('2019-05-20'),
      color: 'Brindle',
      status: 'BREEDING',
      kennelId: kennel1.id,
      breederName: 'John Smith',
      currentOwner: 'John Smith',
      registryName: 'SABMA',
      registrationType: 'STUDBOOK',
      appraisalScore: 85.0,
      appraisalClassification: 'Very Good',
      dnaVerified: true,
      hipScore: 'A',
      elbowScore: '0',
    },
  })

  const sire2 = await prisma.dog.upsert({
    where: { registrationNumber: 'SABMA-2020-001' },
    update: {},
    create: {
      registeredName: 'Titan The Protector',
      registrationNumber: 'SABMA-2020-001',
      microchipNumber: '985141000234567',
      sex: 'MALE',
      dateOfBirth: new Date('2020-01-10'),
      color: 'Red Brindle',
      status: 'BREEDING',
      kennelId: kennel2.id,
      breederName: 'Sarah Johnson',
      currentOwner: 'Sarah Johnson',
      registryName: 'SABMA',
      registrationType: 'STUDBOOK',
      appraisalScore: 90.0,
      appraisalClassification: 'Excellent',
      dnaVerified: true,
      hipScore: 'A',
      elbowScore: '0',
    },
  })

  const dam2 = await prisma.dog.upsert({
    where: { registrationNumber: 'SABMA-2020-002' },
    update: {},
    create: {
      registeredName: 'Zara Guardian Angel',
      registrationNumber: 'SABMA-2020-002',
      microchipNumber: '985141000234568',
      sex: 'FEMALE',
      dateOfBirth: new Date('2020-02-28'),
      color: 'Fawn',
      status: 'BREEDING',
      kennelId: kennel2.id,
      breederName: 'Sarah Johnson',
      currentOwner: 'Sarah Johnson',
      registryName: 'SABMA',
      registrationType: 'STUDBOOK',
      appraisalScore: 87.5,
      appraisalClassification: 'Very Good',
      dnaVerified: true,
      hipScore: 'B',
      elbowScore: '0',
    },
  })

  console.log('Created foundation dogs:', sire1.registeredName, dam1.registeredName, sire2.registeredName, dam2.registeredName)

  // Create a litter
  const litter1 = await prisma.litter.create({
    data: {
      sireId: sire1.id,
      damId: dam1.id,
      dateOfBirth: new Date('2022-06-15'),
      numberOfPups: 8,
      kennelId: kennel1.id,
      notes: 'Healthy litter with excellent temperaments.',
    },
  })

  console.log('Created litter from', sire1.registeredName, 'x', dam1.registeredName)

  // Create offspring
  const puppy1 = await prisma.dog.create({
    data: {
      registeredName: 'Lion Heart Thunder',
      registrationNumber: 'SABMA-2022-001',
      microchipNumber: '985141000345678',
      sex: 'MALE',
      dateOfBirth: new Date('2022-06-15'),
      color: 'Fawn',
      status: 'BREEDING',
      sireId: sire1.id,
      damId: dam1.id,
      litterId: litter1.id,
      kennelId: kennel1.id,
      breederName: 'John Smith',
      currentOwner: 'Michael Brown',
      registryName: 'SABMA',
      registrationType: 'STUDBOOK',
      appraisalScore: 86.0,
      appraisalClassification: 'Very Good',
      dnaVerified: true,
    },
  })

  const puppy2 = await prisma.dog.create({
    data: {
      registeredName: 'Lion Heart Storm',
      registrationNumber: 'SABMA-2022-002',
      microchipNumber: '985141000345679',
      sex: 'FEMALE',
      dateOfBirth: new Date('2022-06-15'),
      color: 'Brindle',
      status: 'ALIVE',
      sireId: sire1.id,
      damId: dam1.id,
      litterId: litter1.id,
      kennelId: kennel1.id,
      breederName: 'John Smith',
      currentOwner: 'Emily Davis',
      registryName: 'SABMA',
      registrationType: 'PET_REGISTER',
    },
  })

  console.log('Created puppies:', puppy1.registeredName, puppy2.registeredName)

  // ========================================
  // WEBSITE CONTENT SEEDING
  // Only seeds if tables are empty (safe for re-runs)
  // ========================================

  // --- 1. Council Members ---
  const councilCount = await prisma.councilMember.count()
  if (councilCount === 0) {
    await prisma.councilMember.createMany({
      data: [
        {
          name: 'Chris Boshoff',
          role: 'Chairman',
          email: 'nyamvubucontracting@gmail.com',
          phone: '+27 82 565 6105',
          image: '/images/council/chairman.jpg',
          sortOrder: 0,
          active: true,
        },
        {
          name: 'Jaco Venter',
          role: 'Vice Chairman',
          email: 'jacoventer59@gmail.com',
          phone: '+27 79 801 8304',
          image: '/images/council/vice-chairman.jpg',
          sortOrder: 1,
          active: true,
        },
        {
          name: 'Alfred White',
          role: 'Board Member - Free State',
          email: 'alfred@alro.co.za',
          phone: '+27 72 991 0176',
          image: '/images/council/board-member-fs.jpg',
          sortOrder: 2,
          active: true,
        },
        {
          name: 'Thabang Phokojoe',
          role: 'Regional Representative - Gauteng',
          email: '',
          phone: '+27 71 138 0666',
          image: '/images/council/regional-rep.jpg',
          sortOrder: 3,
          active: true,
        },
        {
          name: 'Corrie Nieuwoudt',
          role: 'Office Manager',
          email: 'sabmaoffice@gmail.com',
          phone: '+27 72 454 3278',
          image: '/images/council/office-manager.jpg',
          sortOrder: 4,
          active: true,
        },
        {
          name: 'Chris Boshoff',
          role: 'Senior Appraiser',
          email: 'nyamvubucontracting@gmail.com',
          phone: '+27 82 565 6105',
          image: '/images/council/appraiser-1.jpg',
          sortOrder: 5,
          active: true,
        },
        {
          name: 'Kobus Nieuwoudt',
          role: 'Senior Appraiser',
          email: 'kobcosolutions@gmail.com',
          phone: '+27 71 217 8689',
          image: '/images/council/appraiser-2.jpg',
          sortOrder: 6,
          active: true,
        },
      ],
    })
    console.log('Seeded 7 council members')
  } else {
    console.log('Council members already exist, skipping...')
  }

  // --- 2. Breeders ---
  const breederCount = await prisma.breeder.count()
  if (breederCount === 0) {
    await prisma.breeder.createMany({
      data: [
        {
          name: 'Black Legend',
          kennel: 'Black Legend Kennel',
          owners: 'Alfred & Izane White',
          location: 'Virginia, Free State',
          phone: '+27 72 991 0176',
          email: 'alfred@alro.co.za',
          image: '/images/breeders/breeder-banner-2.png',
          sortOrder: 0,
          active: true,
        },
        {
          name: 'Infinity Ark',
          kennel: 'Infinity Ark Kennel',
          owners: 'Ingo de Nobrega',
          location: 'South Africa',
          phone: '',
          email: '',
          image: '/images/breeders/breeder-banner-3.png',
          sortOrder: 1,
          active: true,
        },
        {
          name: 'Maxabel',
          kennel: 'Maxabel Kennel',
          owners: 'Louwrens & Elaine de Jager',
          location: 'Bethlehem, Free State',
          phone: '+27 82 857 3398',
          email: 'louwrensdejager1@gmail.com',
          image: '/images/breeders/maxabel.jpg',
          sortOrder: 2,
          active: true,
        },
        {
          name: 'Mnumzane',
          kennel: 'Mnumzane Kennel',
          owners: 'Jaco & Zelda Venter',
          location: 'Donnybrook, KwaZulu-Natal',
          phone: '+27 79 801 8304',
          email: 'jacoventer59@gmail.com',
          image: '/images/breeders/mnumzane.jpg',
          sortOrder: 3,
          active: true,
        },
        {
          name: 'Nyamvubu',
          kennel: 'Nyamvubu Black Mastiffs',
          owners: 'Chris Boshoff',
          location: 'South Africa',
          phone: '+27 82 565 6105',
          email: 'nyamvubucontracting@gmail.com',
          image: '/images/breeders/nyamvubu.jpg',
          sortOrder: 4,
          active: true,
        },
      ],
    })
    console.log('Seeded 5 breeders')
  } else {
    console.log('Breeders already exist, skipping...')
  }

  // --- 3. Stud Dogs ---
  const studCount = await prisma.studDog.count()
  if (studCount === 0) {
    await prisma.studDog.createMany({
      data: [
        {
          name: 'Nyamvubu Titan',
          lineage: 'Nyamvubu Jors X Maxabel Tofinia',
          classification: 'SILVER',
          image: '/images/studs/stud-1.png',
          sortOrder: 0,
          active: true,
        },
        {
          name: 'Nyamvubu Ruby',
          lineage: 'Nyamvubu Jors X Nyamvubu Stella',
          classification: 'SILVER',
          image: '/images/studs/stud-2.png',
          sortOrder: 1,
          active: true,
        },
        {
          name: 'Nyamvubu Jors',
          lineage: 'Nyamvubu Chrisjan X Nyamvubu Sandra',
          classification: 'SILVER',
          image: '/images/dogs/mastiff-sitting.jpg',
          sortOrder: 2,
          active: true,
        },
      ],
    })
    console.log('Seeded 3 stud dogs')
  } else {
    console.log('Stud dogs already exist, skipping...')
  }

  // --- 4. Gallery Images ---
  const galleryCount = await prisma.galleryImage.count()
  if (galleryCount === 0) {
    await prisma.galleryImage.createMany({
      data: [
        { src: '/images/hero/mastiff-sunset-left.png', alt: 'Black Mastiff silhouette at sunset', sortOrder: 0 },
        { src: '/images/hero/mastiff-sunset-right.png', alt: 'Black Mastiff in golden wheat field', sortOrder: 1 },
        { src: '/images/breed/black-mastiff-adult-studio.png', alt: 'Adult Black Mastiff studio portrait', sortOrder: 2 },
        { src: '/images/breed/black-mastiff-puppy-studio.png', alt: 'Black Mastiff puppy studio portrait', sortOrder: 3 },
        { src: '/images/dogs/black-mastiff-front-portrait.jpg', alt: 'Black Mastiff front portrait', sortOrder: 4 },
        { src: '/images/dogs/black-mastiff-hilltop-blue-sky.jpg', alt: 'Black Mastiff on hilltop', sortOrder: 5 },
        { src: '/images/studs/nyamvubu-serabi.jpg', alt: 'Nyamvubu Serabi - registered stud', sortOrder: 6 },
        { src: '/images/puppies/black-mastiff-puppy-walking.jpg', alt: 'Black Mastiff puppy walking', sortOrder: 7 },
        { src: '/images/puppies/nyamvubu-pepper-card.jpg', alt: 'Nyamvubu Pepper puppy', sortOrder: 8 },
        { src: '/images/puppies/pepper-puppy-white-bg.jpg', alt: 'Pepper puppy portrait', sortOrder: 9 },
        { src: '/images/gallery/mastiff-running-field.jpg', alt: 'Mastiff running in field', sortOrder: 10 },
        { src: '/images/gallery/black-mastiff-stance-01.jpg', alt: 'Black Mastiff in show stance', sortOrder: 11 },
        { src: '/images/gallery/black-mastiff-portrait-01.jpg', alt: 'Black Mastiff portrait', sortOrder: 12 },
        { src: '/images/gallery/black-mastiff-portrait-02.jpg', alt: 'Black Mastiff portrait', sortOrder: 13 },
        { src: '/images/gallery/black-mastiff-studio-portrait.png', alt: 'Black Mastiff studio portrait trio', sortOrder: 14 },
        { src: '/images/breed/black-mastiff-poses-grid.png', alt: 'Black Mastiff multiple poses', sortOrder: 15 },
        { src: '/images/gallery/WhatsApp-Image-2025-02-26-at-16.35.54.jpeg', alt: 'South African Black Mastiff', sortOrder: 16 },
        { src: '/images/gallery/WhatsApp-Image-2025-02-26-at-16.37.20.jpeg', alt: 'South African Black Mastiff', sortOrder: 17 },
        { src: '/images/gallery/WhatsApp-Image-2024-02-01-at-21.51.33.jpeg', alt: 'South African Black Mastiff', sortOrder: 18 },
        { src: '/images/gallery/WhatsApp-Image-2024-02-01-at-21.44.21.jpeg', alt: 'South African Black Mastiff', sortOrder: 19 },
        { src: '/images/gallery/WhatsApp-Image-2024-02-01-at-21.52.28.jpeg', alt: 'South African Black Mastiff', sortOrder: 20 },
        { src: '/images/gallery/WhatsApp-Image-2024-02-01-at-21.51.01.jpeg', alt: 'South African Black Mastiff', sortOrder: 21 },
        { src: '/images/gallery/WhatsApp-Image-2024-02-01-at-21.48.58.jpeg', alt: 'South African Black Mastiff', sortOrder: 22 },
        { src: '/images/gallery/WhatsApp-Image-2024-02-01-at-21.49.17.jpeg', alt: 'South African Black Mastiff', sortOrder: 23 },
        { src: '/images/gallery/WhatsApp-Image-2024-02-01-at-21.46.05.jpeg', alt: 'South African Black Mastiff', sortOrder: 24 },
        { src: '/images/gallery/WhatsApp-Image-2024-02-01-at-21.44.39.jpeg', alt: 'South African Black Mastiff', sortOrder: 25 },
        { src: '/images/gallery/WhatsApp-Image-2024-02-01-at-21.41.10.jpeg', alt: 'South African Black Mastiff', sortOrder: 26 },
        { src: '/images/gallery/WhatsApp-Image-2024-02-01-at-21.41.09.jpeg', alt: 'South African Black Mastiff', sortOrder: 27 },
        { src: '/images/gallery/WhatsApp-Image-2024-02-12-at-20.27.37.jpeg', alt: 'South African Black Mastiff', sortOrder: 28 },
        { src: '/images/gallery/WhatsApp-Image-2024-02-01-at-21.46.50.jpeg', alt: 'South African Black Mastiff', sortOrder: 29 },
        { src: '/images/gallery/WhatsApp-Image-2024-02-01-at-21.53.08.jpeg', alt: 'South African Black Mastiff', sortOrder: 30 },
        { src: '/images/gallery/WhatsApp-Image-2024-02-01-at-21.45.28.jpeg', alt: 'South African Black Mastiff', sortOrder: 31 },
        { src: '/images/hero/hero-main.jpg', alt: 'South African Black Mastiff', sortOrder: 32 },
        { src: '/images/hero/hero-dogs-water.jpg', alt: 'South African Black Mastiffs by water', sortOrder: 33 },
        { src: '/images/dogs/mastiff-sitting.jpg', alt: 'Black Mastiff sitting', sortOrder: 34 },
        { src: '/images/about/two-mastiffs.jpg', alt: 'Two Black Mastiffs', sortOrder: 35 },
      ],
    })
    console.log('Seeded 36 gallery images')
  } else {
    console.log('Gallery images already exist, skipping...')
  }

  // --- 5. Calendar Events ---
  const eventCount = await prisma.calendarEvent.count()
  if (eventCount === 0) {
    await prisma.calendarEvent.createMany({
      data: [
        {
          title: 'Annual Appraisal Day - Gauteng',
          date: new Date('2026-03-15'),
          time: '09:00',
          location: 'Pretoria, Gauteng',
          type: 'Appraisal',
          description: 'Annual breed appraisal for registered dogs. Bring your documentation and registration papers.',
          active: true,
        },
        {
          title: 'SABMA Members Meeting',
          date: new Date('2026-04-20'),
          time: '14:00',
          location: 'Online / Virtual',
          type: 'Meeting',
          description: 'Quarterly members meeting to discuss breed standards, upcoming events, and association matters.',
          active: true,
        },
        {
          title: 'Black Mastiff Breed Seminar',
          date: new Date('2026-05-10'),
          time: '10:00',
          location: 'Bloemfontein, Free State',
          type: 'Seminar',
          description: 'Educational seminar covering breeding practices, health management, and breed preservation.',
          active: true,
        },
        {
          title: 'Annual Appraisal Day - KZN',
          date: new Date('2026-06-22'),
          time: '09:00',
          location: 'Durban, KwaZulu-Natal',
          type: 'Appraisal',
          description: 'Regional appraisal day for members in the KwaZulu-Natal region.',
          active: true,
        },
      ],
    })
    console.log('Seeded 4 calendar events')
  } else {
    console.log('Calendar events already exist, skipping...')
  }

  // --- 6. Testimonials ---
  const testimonialCount = await prisma.testimonial.count()
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({
      data: [
        {
          name: 'Marlize M.',
          quote: 'We are the happy Mom and Dad of 2 wonderful SA Black Mastiffs. Our eldest is now 9 and a 1/2 years old and our young male will be 3 years old in September. I will never get another breed of large dog again. These dogs are just superbly bred. They have the most beautiful temperament and have no health problems.',
          image: '/images/testimonials/marlize.jpg',
          sortOrder: 0,
          active: true,
        },
        {
          name: 'Robert F.',
          quote: 'My observation of the breed is that they make a perfect family protection dog with a strong prey drive. My newly acquired black male, Titan, is loyal to the core, always upbeat in nature and always greets with vigorous wags. Not a dog for anyone with a weak disposition though, because of their size and great strength, they do need firm training.',
          image: '/images/testimonials/robert.jpg',
          sortOrder: 1,
          active: true,
        },
        {
          name: 'David L.',
          quote: 'As a breeder, SABMA has provided me with valuable resources and support. I am proud to be a member of this association and to be a part of the black mastiff community.',
          image: '/images/testimonials/david.jpg',
          sortOrder: 2,
          active: true,
        },
      ],
    })
    console.log('Seeded 3 testimonials')
  } else {
    console.log('Testimonials already exist, skipping...')
  }

  // --- 7. Resources ---
  const resourceCount = await prisma.resource.count()
  if (resourceCount === 0) {
    await prisma.resource.createMany({
      data: [
        // Breed Information
        {
          title: 'Breed Standard',
          description: 'The official breed standard for the South African Black Mastiff, including physical characteristics and temperament.',
          category: 'Breed Information',
          icon: 'document',
          link: '/documents/breed-standard.pdf',
          available: true,
          sortOrder: 0,
        },
        {
          title: 'History of the Breed',
          description: 'Learn about the rich history and heritage of the South African Black Mastiff.',
          category: 'Breed Information',
          icon: 'history',
          available: false,
          sortOrder: 1,
        },
        {
          title: 'Breed Characteristics',
          description: 'Detailed information about the temperament, size, and unique traits of the breed.',
          category: 'Breed Information',
          icon: 'info',
          available: false,
          sortOrder: 2,
        },
        // Health & Care
        {
          title: 'Health Guidelines',
          description: 'Important health information, common conditions, and preventive care for your Black Mastiff.',
          category: 'Health & Care',
          icon: 'health',
          available: false,
          sortOrder: 3,
        },
        {
          title: 'Nutrition Guide',
          description: 'Feeding recommendations and nutritional requirements for puppies and adults.',
          category: 'Health & Care',
          icon: 'nutrition',
          available: false,
          sortOrder: 4,
        },
        {
          title: 'Grooming Tips',
          description: 'Best practices for coat care, nail trimming, and general grooming.',
          category: 'Health & Care',
          icon: 'grooming',
          available: false,
          sortOrder: 5,
        },
        // Training & Behaviour
        {
          title: 'Training Basics',
          description: 'Foundation training techniques specifically suited for the Black Mastiff temperament.',
          category: 'Training & Behaviour',
          icon: 'training',
          available: false,
          sortOrder: 6,
        },
        {
          title: 'Socialization Guide',
          description: 'How to properly socialize your Black Mastiff from puppyhood to adulthood.',
          category: 'Training & Behaviour',
          icon: 'social',
          available: false,
          sortOrder: 7,
        },
        {
          title: 'Behavioural Tips',
          description: 'Understanding and managing common behavioural traits of the breed.',
          category: 'Training & Behaviour',
          icon: 'behaviour',
          available: false,
          sortOrder: 8,
        },
      ],
    })
    console.log('Seeded 9 resources')
  } else {
    console.log('Resources already exist, skipping...')
  }

  // --- 8. Site Settings ---
  const settingsCount = await prisma.siteSetting.count()
  if (settingsCount === 0) {
    const siteSettings = [
      { key: 'siteName', value: 'SABMA' },
      { key: 'fullName', value: 'South African Black Mastiff Association' },
      { key: 'description', value: 'The South African Black Mastiff Association (SABMA) is an organization for breeders of black mastiffs in South Africa. Established to promote responsible breeding and uphold the standards of the black mastiff breed, SABMA focuses on a community of enthusiasts who share a passion for these dogs.' },
      { key: 'phone', value: '+27 72 454 3278' },
      { key: 'whatsapp', value: '+27724543278' },
      { key: 'email', value: 'sabmaoffice@gmail.com' },
      { key: 'address', value: 'South Africa' },
      { key: 'facebookUrl', value: 'https://www.facebook.com/profile.php?id=100063607498498' },
      { key: 'instagramUrl', value: '' },
    ]

    for (const setting of siteSettings) {
      await prisma.siteSetting.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: setting,
      })
    }
    console.log('Seeded 9 site settings')
  } else {
    console.log('Site settings already exist, skipping...')
  }

  console.log('Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

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

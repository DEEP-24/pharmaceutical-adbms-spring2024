import { Gender, PrismaClient } from '@prisma/client'
import { createPasswordHash } from '~/utils/misc'

const db = new PrismaClient()

async function cleanup() {
  console.time('🧹 Cleaned up the database...')
  await db.prescription.deleteMany()
  await db.appointment.deleteMany()
  await db.patient.deleteMany()
  await db.doctor.deleteMany()
  await db.pharmacist.deleteMany()
  await db.admin.deleteMany()
  await db.medication.deleteMany()
  console.timeEnd('🧹 Cleaned up the database...')
}

async function createAdmins() {
  console.time(`👤 Created admins...`)
  await db.admin.create({
    data: {
      email: 'admin@app.com',
      name: 'Admin User',
      passwordHash: await createPasswordHash('password'),
    },
  })
  console.timeEnd(`👤 Created admins...`)
}

async function createDoctors() {
  console.time(`👤 Created doctors...`)
  await db.doctor.create({
    data: {
      email: 'doctor@app.com',
      name: 'Doctor User',
      passwordHash: await createPasswordHash('password'),
    },
  })
  console.timeEnd(`👤 Created doctors...`)
}

async function createPatients() {
  console.time(`👤 Created patients...`)
  await db.patient.create({
    data: {
      email: 'patient@app.com',
      name: 'John Doe',
      passwordHash: await createPasswordHash('password'),
      gender: Gender.MALE,
      dob: new Date('1990-01-01'),
      phone: '1234567890',
    },
  })
  console.timeEnd(`👤 Created patients...`)
}

async function createPharmacists() {
  console.time(`👤 Created pharmacists...`)
  await db.pharmacist.create({
    data: {
      email: 'pharmacist@app.com',
      name: 'Aden Walker',
      passwordHash: await createPasswordHash('password'),
    },
  })
  console.timeEnd(`👤 Created pharmacists...`)
}

async function createMedications() {
  console.time(`💊 Created medications...`)
  await db.medication.createMany({
    data: [
      {
        brand: 'Glucophage',
        dosage: '500mg',
        name: 'Metformin',
        quantity: 60,
        price: 60,
        unit: 'MG',
      },
      {
        brand: 'Dolo',
        dosage: '500mg',
        name: 'Dolo 500',
        quantity: 60,
        price: 40,
        unit: 'MG',
      },
      {
        brand: 'Dolo',
        dosage: '650mg',
        name: 'Dolo 650 EX',
        quantity: 30,
        price: 12,
        unit: 'MG',
      },
      {
        brand: 'Dolo',
        dosage: '250mg',
        name: 'Dolo Liquid',
        quantity: 100,
        price: 20,
        unit: 'MG',
      },
      {
        brand: 'Saradon',
        dosage: '500mg',
        name: 'Saradon',
        quantity: 60,
        price: 50,
        unit: 'MG',
      },
    ],
  })
  console.timeEnd(`💊 Created medications...`)
}

async function seed() {
  console.log('🌱 Seeding...\n')

  await cleanup()

  console.time(`🌱 Database has been seeded`)

  await Promise.all([
    createAdmins(),
    createDoctors(),
    createPatients(),
    createPharmacists(),
    createMedications(),
  ])

  console.timeEnd(`🌱 Database has been seeded`)
}

seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })

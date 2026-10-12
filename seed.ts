import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const departments = [
    ["Management", "Station leadership and coordination"],
    ["News & Editorial", "News gathering, reporting and editorial"],
    ["Programmes & Production", "Studio programmes and field production"],
    ["Technical & Engineering", "Equipment, transmission and maintenance"],
    ["Marketing & Sales", "Commercial services and sponsorship"],
    ["Finance", "Income, expenses, budgets and financial controls"],
    ["Administration & HR", "Staff records, roster and administration"],
    ["Digital & Social Media", "Digital publishing and social channels"]
  ] as const;

  for (const [name, description] of departments) {
    await prisma.department.upsert({
      where: { name },
      update: { description },
      create: { name, description }
    });
  }

  console.log(`Seeded ${departments.length} departments.`);
  console.log("No default user or password has been created. Configure a real authentication provider before use.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());

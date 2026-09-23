import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL || "";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database with Workfolio/Jobly showcase data...");

  // Create Alex (Hiring Manager)
  const passwordHash = await bcrypt.hash("Password123!", 10);
  const alex = await prisma.user.upsert({
    where: { email: "alex@company.com" },
    update: {},
    create: {
      email: "alex@company.com",
      passwordHash,
      name: "Alex Morgan",
      role: "HIRING_MANAGER",
      companyName: "Google",
      companyWebsite: "https://google.com",
    },
  });

  // Create demo candidate
  await prisma.user.upsert({
    where: { email: "candidate@workfolio.com" },
    update: {},
    create: {
      email: "candidate@workfolio.com",
      passwordHash,
      name: "Sarah Parker",
      role: "JOB_SEEKER",
    },
  });

  // Sample jobs matching the photo
  const jobsData = [
    {
      title: "Senior Product Designer",
      company: "Google",
      location: "Colombo, Sri Lanka",
      workplaceType: "ON_SITE" as const,
      employmentType: "FULL_TIME" as const,
      salaryMin: 30000,
      salaryMax: 48000,
      currency: "USD",
      description: "We are looking for a Senior Product Designer to shape the future of our enterprise software solutions. You will collaborate closely with product managers and engineers to craft simple, intuitive user experiences that delight millions of global users.",
      requirements: "• 5+ years of digital product design experience\n• Expert proficiency in Figma and design systems\n• Proven track record of launching consumer or B2B SaaS products",
      skills: "Figma, UI/UX, Design Systems, User Research, Prototyping",
      postedById: alex.id,
      status: "ACTIVE" as const,
    },
    {
      title: "UI/UX Designer",
      company: "Shopify",
      location: "Remote",
      workplaceType: "REMOTE" as const,
      employmentType: "FULL_TIME" as const,
      salaryMin: 36000,
      salaryMax: 60000,
      currency: "USD",
      description: "Join Shopify's merchant experience team to build next-generation e-commerce tools. You'll lead design sprints, conduct usability testing, and maintain our world-class Polaris design system.",
      requirements: "• 3+ years experience designing web applications\n• Strong portfolio showing end-to-end design thinking\n• Experience working asynchronously across remote teams",
      skills: "Figma, Mobile Design, E-commerce, Polaris, Wireframing",
      postedById: alex.id,
      status: "ACTIVE" as const,
    },
    {
      title: "Frontend Developer",
      company: "Microsoft",
      location: "Colombo, Sri Lanka",
      workplaceType: "HYBRID" as const,
      employmentType: "FULL_TIME" as const,
      salaryMin: 24000,
      salaryMax: 42000,
      currency: "USD",
      description: "Microsoft is expanding its regional engineering team in Colombo. We are seeking a talented Frontend Developer who loves crafting snappy, accessible web experiences using modern React and TypeScript.",
      requirements: "• Proficiency in modern React, Next.js, and TypeScript\n• Understanding of web performance, SSR, and state management\n• Strong foundation in CSS and modern UI frameworks",
      skills: "React, TypeScript, Next.js, Tailwind CSS, GraphQL",
      postedById: alex.id,
      status: "ACTIVE" as const,
    },
    {
      title: "Product Marketing Manager",
      company: "Stripe",
      location: "Singapore (Remote)",
      workplaceType: "REMOTE" as const,
      employmentType: "FULL_TIME" as const,
      salaryMin: 48000,
      salaryMax: 78000,
      currency: "USD",
      description: "Stripe is seeking an experienced Product Marketing Manager to lead go-to-market strategies for our payment infrastructure products across the APAC region.",
      requirements: "• 4+ years of B2B SaaS product marketing experience\n• Excellent copywriting, analytical, and messaging skills\n• Experience collaborating with sales, product, and developer relations",
      skills: "Product Marketing, GTM Strategy, Copywriting, FinTech, Analytics",
      postedById: alex.id,
      status: "ACTIVE" as const,
    },
    {
      title: "Customer Support Specialist",
      company: "Airbnb",
      location: "Colombo, Sri Lanka",
      workplaceType: "ON_SITE" as const,
      employmentType: "PART_TIME" as const,
      salaryMin: 9600,
      salaryMax: 14400,
      currency: "USD",
      description: "Join our Community Support team to help hosts and guests resolve inquiries and experience magical stays. Ideal for problem solvers with high empathy and outstanding communication skills.",
      requirements: "• 1+ years experience in customer service or hospitality\n• Fluent written and spoken English\n• Ability to handle complex situations with patience and clarity",
      skills: "Customer Support, Communication, Zendesk, Problem Solving",
      postedById: alex.id,
      status: "ACTIVE" as const,
    },
    {
      title: "Data Analyst",
      company: "Virtusa",
      location: "Colombo, Sri Lanka",
      workplaceType: "HYBRID" as const,
      employmentType: "FULL_TIME" as const,
      salaryMin: 21600,
      salaryMax: 33600,
      currency: "USD",
      description: "Virtusa is hiring a Data Analyst to translate complex datasets into actionable insights for financial and healthcare clients.",
      requirements: "• Strong SQL and data visualization skills (PowerBI, Tableau)\n• Familiarity with Python or R for statistical analysis",
      skills: "SQL, PowerBI, Tableau, Python, Data Warehousing",
      postedById: alex.id,
      status: "ACTIVE" as const,
    },
    {
      title: "Graphics Designer",
      company: "99x",
      location: "Remote",
      workplaceType: "REMOTE" as const,
      employmentType: "FULL_TIME" as const,
      salaryMin: 10800,
      salaryMax: 18000,
      currency: "USD",
      description: "Create striking brand assets, marketing collateral, social media visuals, and digital presentations for global tech clients.",
      requirements: "• Proficiency in Adobe Creative Suite (Illustrator, Photoshop, AfterEffects)\n• Eye for typography, color theory, and modern brand design",
      skills: "Illustrator, Photoshop, Branding, Motion Graphics, Typography",
      postedById: alex.id,
      status: "ACTIVE" as const,
    },
    {
      title: "DevOps Engineer",
      company: "WSO2",
      location: "Colombo, Sri Lanka",
      workplaceType: "ON_SITE" as const,
      employmentType: "FULL_TIME" as const,
      salaryMin: 30000,
      salaryMax: 45600,
      currency: "USD",
      description: "Work with our cloud infrastructure team to automate CI/CD pipelines, optimize Kubernetes clusters, and scale enterprise open-source software.",
      requirements: "• Experience with Kubernetes, Docker, and AWS / Azure\n• Strong scripting skills in Bash or Python\n• Familiarity with Terraform and infrastructure-as-code",
      skills: "Kubernetes, Docker, AWS, Terraform, CI/CD, Linux",
      postedById: alex.id,
      status: "ACTIVE" as const,
    },
  ];

  for (const job of jobsData) {
    const existing = await prisma.job.findFirst({
      where: { title: job.title, company: job.company },
    });
    if (!existing) {
      await prisma.job.create({ data: job });
    }
  }

  console.log("Database seeded successfully with photo showcase jobs!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


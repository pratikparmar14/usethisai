
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ========================
// 50 HIGH-VALUE PROFESSIONS
// ========================
const PROFESSIONS = [
  // Healthcare
  { title: 'Dentist', slug: 'dentists' },
  { title: 'Doctor', slug: 'doctors' },
  { title: 'Therapist', slug: 'therapists' },
  { title: 'Surgeon', slug: 'surgeons' },
  { title: 'Veterinarian', slug: 'veterinarians' },

  // Finance & Accounting
  { title: 'Accountant', slug: 'accountants' },
  { title: 'Financial Advisor', slug: 'financial-advisors' },
  { title: 'Tax Consultant', slug: 'tax-consultants' },
  { title: 'Bookkeeper', slug: 'bookkeepers' },
  { title: 'CPA', slug: 'cpas' },

  // Law & Legal
  { title: 'Lawyer', slug: 'lawyers' },
  { title: 'Paralegal', slug: 'paralegals' },
  { title: 'Notary', slug: 'notaries' },
  { title: 'Legal Secretary', slug: 'legal-secretaries' },

  // Real Estate
  { title: 'Realtor', slug: 'realtors' },
  { title: 'Real Estate Agent', slug: 'real-estate-agents' },
  { title: 'Property Manager', slug: 'property-managers' },
  { title: 'Appraiser', slug: 'appraisers' },

  // Tech & Development
  { title: 'Software Developer', slug: 'software-developers' },
  { title: 'Web Developer', slug: 'web-developers' },
  { title: 'Data Scientist', slug: 'data-scientists' },
  { title: 'DevOps Engineer', slug: 'devops-engineers' },
  { title: 'UX Designer', slug: 'ux-designers' },

  // Business & Management
  { title: 'Project Manager', slug: 'project-managers' },
  { title: 'Business Analyst', slug: 'business-analysts' },
  { title: 'Consultant', slug: 'consultants' },
  { title: 'CEO', slug: 'ceos' },
  { title: 'Product Manager', slug: 'product-managers' },

  // Sales & Marketing
  { title: 'Marketer', slug: 'marketers' },
  { title: 'Salesperson', slug: 'salespeople' },
  { title: 'Content Creator', slug: 'content-creators' },
  { title: 'SEO Specialist', slug: 'seo-specialists' },
  { title: 'Social Media Manager', slug: 'social-media-managers' },

  // Creative & Media
  { title: 'Graphic Designer', slug: 'graphic-designers' },
  { title: 'Photographer', slug: 'photographers' },
  { title: 'Videographer', slug: 'videographers' },
  { title: 'Copywriter', slug: 'copywriters' },
  { title: 'Animator', slug: 'animators' },

  // Education & Training
  { title: 'Teacher', slug: 'teachers' },
  { title: 'Tutor', slug: 'tutors' },
  { title: 'Course Creator', slug: 'course-creators' },
  { title: 'Trainer', slug: 'trainers' },

  // Trade & Service
  { title: 'Electrician', slug: 'electricians' },
  { title: 'Plumber', slug: 'plumbers' },
  { title: 'HVAC Technician', slug: 'hvac-technicians' },
  { title: 'Contractor', slug: 'contractors' },
]

// ========================
// 30 REAL AI TOOLS
// ========================
const TOOLS = [
  // Text Generation
  { name: 'ChatGPT', slug: 'chatgpt', website: 'https://chatgpt.com', pricing: 'Freemium' },
  { name: 'Claude', slug: 'claude', website: 'https://claude.ai', pricing: 'Freemium' },
  { name: 'Jasper', slug: 'jasper', website: 'https://jasper.ai', pricing: 'Paid' },
  { name: 'Copy.ai', slug: 'copy-ai', website: 'https://copy.ai', pricing: 'Freemium' },
  { name: 'Perplexity', slug: 'perplexity', website: 'https://perplexity.ai', pricing: 'Freemium' },

  // Image Generation
  { name: 'Midjourney', slug: 'midjourney', website: 'https://midjourney.com', pricing: 'Paid' },
  { name: 'DALL-E', slug: 'dall-e', website: 'https://openai.com/dall-e', pricing: 'Paid' },
  { name: 'Stable Diffusion', slug: 'stable-diffusion', website: 'https://stablediffusionweb.com', pricing: 'Freemium' },
  { name: 'Adobe Firefly', slug: 'adobe-firefly', website: 'https://firefly.adobe.com', pricing: 'Freemium' },

  // Design & Video
  { name: 'Canva', slug: 'canva', website: 'https://canva.com', pricing: 'Freemium' },
  { name: 'Runway', slug: 'runway', website: 'https://runwayml.com', pricing: 'Freemium' },
  { name: 'Synthesia', slug: 'synthesia', website: 'https://synthesia.io', pricing: 'Paid' },
  { name: 'Descript', slug: 'descript', website: 'https://descript.com', pricing: 'Freemium' },

  // Writing & Grammar
  { name: 'Grammarly', slug: 'grammarly', website: 'https://grammarly.com', pricing: 'Freemium' },
  { name: 'Hemingway Editor', slug: 'hemingway-editor', website: 'https://hemingwayapp.com', pricing: 'Freemium' },

  // Code & Development
  { name: 'GitHub Copilot', slug: 'github-copilot', website: 'https://github.com/copilot', pricing: 'Paid' },
  { name: 'Tabnine', slug: 'tabnine', website: 'https://tabnine.com', pricing: 'Freemium' },
  { name: 'Replit', slug: 'replit', website: 'https://replit.com', pricing: 'Freemium' },

  // Productivity
  { name: 'Notion AI', slug: 'notion-ai', website: 'https://notion.so', pricing: 'Paid' },
  { name: 'Microsoft Copilot', slug: 'microsoft-copilot', website: 'https://copilot.microsoft.com', pricing: 'Freemium' },

  // Audio & Voice
  { name: 'Otter.ai', slug: 'otter-ai', website: 'https://otter.ai', pricing: 'Freemium' },
  { name: 'Fireflies.io', slug: 'fireflies-io', website: 'https://fireflies.ai', pricing: 'Freemium' },
  { name: 'ElevenLabs', slug: 'elevenlabs', website: 'https://elevenlabs.io', pricing: 'Freemium' },

  // Business Intelligence
  { name: 'Google Gemini', slug: 'google-gemini', website: 'https://gemini.google.com', pricing: 'Freemium' },
  { name: 'Copilot Pro', slug: 'copilot-pro', website: 'https://copilotpro.microsoft.com', pricing: 'Paid' },

  // Data & Analysis
  { name: 'ChatGPT Plus', slug: 'chatgpt-plus', website: 'https://chatgpt.com/plus', pricing: 'Paid' },
  { name: 'GPT-4', slug: 'gpt-4', website: 'https://openai.com/gpt-4', pricing: 'Paid' },
]

// ========================
// USE CASE TEMPLATES
// ========================
const USE_CASES = [
  'Automating administrative tasks and document management',
  'Generating professional correspondence and reports',
  'Streamlining client communication and outreach',
  'Enhancing content creation and marketing materials',
  'Analyzing data and producing insights',
  'Scheduling optimization and time management',
  'Improving proposal and pitch generation',
  'Facilitating research and industry analysis',
  'Enhancing customer service and support',
  'Automating routine documentation and filing',
]

// ========================
// FAQ GENERATION
// ========================
function generateFAQs(professionTitle: string): string {
  const faqs = [
    {
      q: `How much time can AI tools save a ${professionTitle.toLowerCase()}?`,
      a: `AI tools can save 10-20 hours per week by automating routine tasks like documentation, research, and client communication. The exact time savings depend on which tools you adopt and how you integrate them into your workflow.`,
    },
    {
      q: `Are AI tools expensive for ${professionTitle.toLowerCase()}s?`,
      a: `Many AI tools offer free or freemium plans. Premium plans typically range from $10-50/month. The ROI is usually positive within the first month due to time savings.`,
    },
    {
      q: `Do I need technical skills to use AI tools as a ${professionTitle.toLowerCase()}?`,
      a: `No. Most modern AI tools are designed for non-technical users. They typically have intuitive interfaces and require minimal learning curve.`,
    },
    {
      q: `Can AI tools replace my job as a ${professionTitle.toLowerCase()}?`,
      a: `AI is a tool, not a replacement. It automates repetitive tasks and enhances productivity, but human expertise, judgment, and client relationships remain irreplaceable.`,
    },
    {
      q: `Which AI tool is best for ${professionTitle.toLowerCase()}s?`,
      a: `The best tool depends on your specific needs. ChatGPT and Claude excel at writing and analysis, while Canva and Midjourney are better for design. Many ${professionTitle.toLowerCase()}s use a combination of tools.`,
    },
  ]
  return JSON.stringify(faqs)
}

async function main() {
  console.log('🚀 Starting database seeding...\n')

  // ========================
  // 1. CLEAR EXISTING DATA
  // ========================
  console.log('🧹 Clearing existing data...')
  await prisma.toolProfession.deleteMany({})
  await prisma.sEOContent.deleteMany({})
  await prisma.tool.deleteMany({})
  await prisma.profession.deleteMany({})

  // ========================
  // 2. SEED PROFESSIONS
  // ========================
  console.log(`📝 Seeding ${PROFESSIONS.length} professions...`)
  const createdProfessions = []
  for (const p of PROFESSIONS) {
    const profession = await prisma.profession.create({
      data: {
        slug: p.slug,
        title: p.title,
        description: `Discover the best AI tools specifically designed to help ${p.title.toLowerCase()}s boost productivity, streamline workflows, and stay competitive in 2025. From automating administrative tasks to generating professional content, these tools are transforming how ${p.title.toLowerCase()}s work.`,
        seoTitle: `Best AI Tools for ${p.title}s in 2025 | UseThisAI`,
        seoDescription: `Explore top-rated AI tools for ${p.title.toLowerCase()}s. Increase productivity, automate tasks, and save time. Free and paid options available.`,
      },
    })
    createdProfessions.push(profession)
  }

  // ========================
  // 3. SEED TOOLS
  // ========================
  console.log(`🛠️  Seeding ${TOOLS.length} AI tools...`)
  const createdTools = []
  for (const t of TOOLS) {
    const tool = await prisma.tool.create({
      data: {
        name: t.name,
        slug: t.slug,
        website: t.website,
        pricing: t.pricing,
        logo: `https://logo.clearbit.com/${t.website}`,
        affiliateLink: `${t.website}?ref=usethisai`,
      },
    })
    createdTools.push(tool)
  }

  // ========================
  // 4. SEED RELATIONSHIPS (400+)
  // ========================
  console.log(`🔗 Creating tool-profession relationships...`)
  let relationshipCount = 0
  for (const profession of createdProfessions) {
    // Each profession gets 8-12 tools (50 professions * 10 = 500+ relationships)
    const toolCount = Math.floor(Math.random() * 5) + 8 // 8-12
    const shuffledTools = createdTools.sort(() => Math.random() - 0.5).slice(0, toolCount)

    for (const tool of shuffledTools) {
      await prisma.toolProfession.create({
        data: {
          toolId: tool.id,
          professionId: profession.id,
          rating: Math.floor(Math.random() * 5) + 1, // 1-5 stars
          useCase: USE_CASES[Math.floor(Math.random() * USE_CASES.length)],
        },
      })
      relationshipCount++
    }
  }

  // ========================
  // 5. SEED SEO CONTENT
  // ========================
  console.log(`📄 Seeding SEO content and FAQs...`)
  for (const profession of createdProfessions) {
    await prisma.sEOContent.create({
      data: {
        professionId: profession.id,
        intro: `In 2025, ${profession.title.toLowerCase()}s are increasingly turning to AI tools to enhance their services, save time, and stay competitive. Whether you're looking to automate administrative work, generate professional documents, or improve client communication, the right AI tool can transform your practice. This guide covers the best AI tools for ${profession.title.toLowerCase()}s, how they work, and why they matter for your business.`,
        faqJson: generateFAQs(profession.title),
      },
    })
  }

  // ========================
  // FINAL REPORT
  // ========================
  console.log('\n✅ Seeding completed successfully!\n')
  console.log(`📊 Summary:`)
  console.log(`   ✓ ${createdProfessions.length} professions created`)
  console.log(`   ✓ ${createdTools.length} tools created`)
  console.log(`   ✓ ${relationshipCount} tool-profession relationships created`)
  console.log(`   ✓ ${createdProfessions.length} SEO content entries with FAQs created`)
  console.log(`\n🎯 Total searchable pages: ~${createdProfessions.length + createdTools.length}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })

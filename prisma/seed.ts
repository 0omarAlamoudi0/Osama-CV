import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create User Info
  const userInfo = await prisma.userInfo.upsert({
    where: { id: 'default-user' },
    update: {},
    create: {
      id: 'default-user',
      fullName: 'أسامة محمد زكريا جنيدي',
      jobTitle: 'خبير في التجارة الإلكترونية والتسويق الرقمي',
      email: 'osama.mo.zakaria@gmail.com',
      phone: '0559568530',
      location: 'جدة، المملكة العربية السعودية',
      birthDate: '2003-11-14',
    },
  })
  console.log('✓ User Info created')

  // Create About Info
  const aboutInfo = await prisma.aboutInfo.upsert({
    where: { id: 'default-about' },
    update: {},
    create: {
      id: 'default-about',
      mainIntro: 'متخصص في إدارة المتاجر الإلكترونية وكتابة المحتوى والتسويق الرقمي. طالب في علوم البيانات والذكاء الاصطناعي مع شغف بالتعلم والتطوير المستمر.',
      paragraph1: 'خريج ثانوي بامتياز بمعدل 97% وحالياً أدرس بكالوريوس علوم البيانات والذكاء الاصطناعي. أتمتع بخبرة عملية متنوعة في إدارة المتاجر الإلكترونية، كتابة المحتوى، التسويق الرقمي، والدعم التقني.',
      paragraph2: 'شغوف بالتعلم الذاتي والتطوير المستمر، وأسعى دائماً لتقديم قيمة حقيقية من خلال عملي. أؤمن بأن الجمع بين الإبداع والتحليل هو مفتاح النجاح في العصر الرقمي.',
    },
  })
  console.log('✓ About Info created')

  // Create Skills
  const skillsData = [
    // Technical Skills
    { name: 'كانفا - التصميم الجرافيكي', category: 'تقنية', icon: '💻', sortOrder: 1 },
    { name: 'سلة - إدارة المتاجر', category: 'تقنية', icon: '💻', sortOrder: 2 },
    { name: 'Microsoft Excel', category: 'تقنية', icon: '💻', sortOrder: 3 },
    { name: 'Microsoft Word', category: 'تقنية', icon: '💻', sortOrder: 4 },
    { name: 'Microsoft PowerPoint', category: 'تقنية', icon: '💻', sortOrder: 5 },
    { name: 'تحليل البيانات', category: 'تقنية', icon: '💻', sortOrder: 6 },
    // Marketing Skills
    { name: 'التسويق الإلكتروني', category: 'تسويق', icon: '📊', sortOrder: 7 },
    { name: 'كتابة المحتوى', category: 'تسويق', icon: '📊', sortOrder: 8 },
    { name: 'إدارة السوشيال ميديا', category: 'تسويق', icon: '📊', sortOrder: 9 },
    { name: 'التجارة الإلكترونية', category: 'تسويق', icon: '📊', sortOrder: 10 },
    { name: 'SEO & التسويق بالعمولة', category: 'تسويق', icon: '📊', sortOrder: 11 },
    { name: 'إدارة الحملات', category: 'تسويق', icon: '📊', sortOrder: 12 },
    // Personal Skills
    { name: 'التفكير الإبداعي', category: 'شخصية', icon: '🎯', sortOrder: 13 },
    { name: 'التحليل والتخطيط', category: 'شخصية', icon: '🎯', sortOrder: 14 },
    { name: 'التعلم الذاتي', category: 'شخصية', icon: '🎯', sortOrder: 15 },
    { name: 'العمل الجماعي', category: 'شخصية', icon: '🎯', sortOrder: 16 },
    { name: 'إدارة الوقت', category: 'شخصية', icon: '🎯', sortOrder: 17 },
    { name: 'حل المشكلات', category: 'شخصية', icon: '🎯', sortOrder: 18 },
  ]

  for (const skill of skillsData) {
    await prisma.skill.upsert({
      where: { id: `skill-${skill.sortOrder}` },
      update: {},
      create: {
        id: `skill-${skill.sortOrder}`,
        ...skill,
      },
    })
  }
  console.log('✓ Skills created')

  // Create Experience
  const experienceData = [
    {
      id: 'exp-1',
      title: 'سكرتير قسم ودعم تقني',
      company: 'شركة بنيان للتدريب المحدود',
      description: 'إدارة المهام السكرتارية والإدارية للقسم، تقديم الدعم التقني وحل المشكلات التقنية بكفاءة عالية.',
      isCurrent: true,
      sortOrder: 1,
    },
    {
      id: 'exp-2',
      title: 'مدير متجر إلكتروني',
      company: 'متجر ريڤير | Rever',
      description: 'إدارة شاملة للمتجر الإلكتروني، الإشراف على العمليات اليومية وإدارة الموظفين، تحسين تجربة العملاء ورفع مستوى الخدمة.',
      isCurrent: false,
      sortOrder: 2,
    },
    {
      id: 'exp-3',
      title: 'مدير محتوى وإشراف تسويقي',
      company: 'متجر أنا تقني',
      description: 'إدخال المنتجات وكتابة أوصافها التسويقية، الإشراف على صناع المحتوى والمسوقين بالعمولة في قسم التسويق.',
      isCurrent: false,
      sortOrder: 3,
    },
    {
      id: 'exp-4',
      title: 'كاتب محتوى سوشيال ميديا',
      company: 'شركة مجموعة بناء',
      description: 'كتابة وإعداد محتوى جذاب لمنصات التواصل الاجتماعي، تطوير استراتيجيات المحتوى لزيادة التفاعل والوصول.',
      isCurrent: false,
      sortOrder: 4,
    },
    {
      id: 'exp-5',
      title: 'موظف خدمة عملاء',
      company: 'متجر إلكتروني',
      description: 'التعامل مع استفسارات العملاء وحل مشاكلهم بكفاءة، توفير تجربة متميزة للعملاء وبناء علاقات طويلة الأمد.',
      isCurrent: false,
      sortOrder: 5,
    },
  ]

  for (const exp of experienceData) {
    await prisma.experience.upsert({
      where: { id: exp.id },
      update: {},
      create: exp,
    })
  }
  console.log('✓ Experience created')

  // Create Projects
  const project1 = await prisma.project.upsert({
    where: { id: 'project-1' },
    update: {},
    create: {
      id: 'project-1',
      name: 'BLACK WOOD',
      category: 'تحف واكسسوارات خشبية',
      description: 'متجر متخصص في المنتجات الخشبية الفاخرة والتحف الفنية. تصميم وإطلاق المتجر بالكامل مع تطوير الهوية البصرية وتجربة المستخدم.',
      sortOrder: 1,
      tags: {
        create: [
          { tag: 'تصميم' },
          { tag: 'إدارة المتجر' },
          { tag: 'كتابة المحتوى' },
        ],
      },
    },
  })
  console.log('✓ Project BLACK WOOD created')

  const project2 = await prisma.project.upsert({
    where: { id: 'project-2' },
    update: {},
    create: {
      id: 'project-2',
      name: 'BEPAIR',
      category: 'منتجات العناية الشخصية',
      description: 'متجر متكامل لمنتجات العناية الشخصية والجمال. تطوير استراتيجية تسويقية شاملة وإدارة عمليات البيع والشحن.',
      sortOrder: 2,
      tags: {
        create: [
          { tag: 'التسويق الرقمي' },
          { tag: 'إدارة العمليات' },
          { tag: 'خدمة العملاء' },
        ],
      },
    },
  })
  console.log('✓ Project BEPAIR created')

  const project3 = await prisma.project.upsert({
    where: { id: 'project-3' },
    update: {},
    create: {
      id: 'project-3',
      name: 'BRANLY AI',
      category: 'منتجات رقمية ذكية',
      description: 'متجر مبتكر للمنتجات الرقمية القائمة على الذكاء الاصطناعي. تطوير محتوى رقمي عالي الجودة وبناء منصة توزيع آلية.',
      sortOrder: 3,
      tags: {
        create: [
          { tag: 'الذكاء الاصطناعي' },
          { tag: 'منتجات رقمية' },
          { tag: 'أتمتة' },
        ],
      },
    },
  })
  console.log('✓ Project BRANLY AI created')

  // Create Courses
  const coursesData = [
    { id: 'course-1', name: 'دبلومة التسويق الإلكتروني (15 دورة)', sortOrder: 1 },
    { id: 'course-2', name: 'الرخصة الدولية لقيادة الحاسوب ICDL', sortOrder: 2 },
    { id: 'course-3', name: 'دورة Microsoft Office 365', sortOrder: 3 },
    { id: 'course-4', name: 'دورة مفاهيم التسويق', provider: 'إنفلونس (Influence)', sortOrder: 4 },
    { id: 'course-5', name: 'دورة التجارة الإلكترونية', sortOrder: 5 },
  ]

  for (const course of coursesData) {
    await prisma.course.upsert({
      where: { id: course.id },
      update: {},
      create: course,
    })
  }
  console.log('✓ Courses created')

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

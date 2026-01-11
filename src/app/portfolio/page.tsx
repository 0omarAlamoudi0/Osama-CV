'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, ExternalLink, ArrowRight } from 'lucide-react'

interface UserInfo {
  fullName: string
  jobTitle: string
  email: string
  phone: string
  location: string
  birthDate: string
}

interface AboutInfo {
  mainIntro: string
  paragraph1: string
  paragraph2: string
}

interface Skill {
  id: string
  name: string
  category: string
  icon: string
}

interface Experience {
  id: string
  title: string
  company: string
  description: string
  isCurrent: boolean
  startDate?: string
  endDate?: string
}

interface Project {
  id: string
  name: string
  category: string
  description: string
  url?: string
  tags?: { tag: string }[]
}

export default function Portfolio() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null)
  const [skills, setSkills] = useState<Skill[]>([])
  const [experience, setExperience] = useState<Experience[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, aboutRes, skillsRes, expRes, projectsRes] = await Promise.all([
          fetch('/api/userinfo'),
          fetch('/api/about'),
          fetch('/api/skills'),
          fetch('/api/experience'),
          fetch('/api/projects'),
        ])

        const [userData, aboutData, skillsData, expData, projectsData] = await Promise.all([
          userRes.json(),
          aboutRes.json(),
          skillsRes.json(),
          expRes.json(),
          projectsRes.json(),
        ])

        setUserInfo(userData)
        setAboutInfo(aboutData)
        setSkills(Array.isArray(skillsData) ? skillsData : [])
        setExperience(Array.isArray(expData) ? expData : [])
        setProjects(Array.isArray(projectsData) ? projectsData : [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    setMounted(true)
  }, [])

  const groupedSkills = (Array.isArray(skills) ? skills : []).reduce((acc, skill) => {
    if (skill && skill.category) {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
    }
    return acc
  }, {} as Record<string, Skill[]>)

  const categoryIcons: Record<string, string> = {
    تقنية: '💻',
    تسويق: '📊',
    شخصية: '🎯',
  }

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-2xl font-bold text-primary animate-pulse">جاري التحميل...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100" dir="rtl">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-black bg-gradient-to-r from-[#0A2647] via-[#144272] to-[#205295] bg-clip-text text-transparent">
            أسامة جنيدي
          </div>
          <ul className="hidden md:flex gap-8 list-none">
            <li><a href="#home" className="text-gray-700 hover:text-[#205295] transition-colors font-medium">الرئيسية</a></li>
            <li><a href="#about" className="text-gray-700 hover:text-[#205295] transition-colors font-medium">نبذة عني</a></li>
            <li><a href="#skills" className="text-gray-700 hover:text-[#205295] transition-colors font-medium">المهارات</a></li>
            <li><a href="#experience" className="text-gray-700 hover:text-[#205295] transition-colors font-medium">الخبرات</a></li>
            <li><a href="#projects" className="text-gray-700 hover:text-[#205295] transition-colors font-medium">المشاريع</a></li>
            <li><a href="#contact" className="text-gray-700 hover:text-[#205295] transition-colors font-medium">تواصل معي</a></li>
          </ul>
          <a
            href="/admin"
            className="px-4 py-2 bg-gradient-to-r from-[#0A2647] to-[#205295] text-white rounded-full font-medium hover:shadow-lg transition-all"
          >
            لوحة التحكم
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#2C74B3] to-[#205295] text-white rounded-full font-semibold mb-6"
          >
            مرحباً بك في موقعي
          </motion.span>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-[#0A2647] via-[#144272] to-[#205295] bg-clip-text text-transparent leading-tight"
          >
            {userInfo?.fullName}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl md:text-3xl text-[#144272] font-medium mb-6"
          >
            {userInfo?.jobTitle}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
          >
            {aboutInfo?.mainIntro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-4 justify-center flex-wrap mb-12"
          >
            <a
              href="#projects"
              className="px-8 py-4 bg-gradient-to-r from-[#0A2647] via-[#144272] to-[#205295] text-white rounded-full font-bold text-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              استكشف أعمالي
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-white text-[#0A2647] border-2 border-[#0A2647] rounded-full font-bold text-lg hover:bg-[#0A2647] hover:text-white transition-all transform hover:-translate-y-1"
            >
              تواصل معي
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <Mail className="w-8 h-8 text-[#205295] mx-auto mb-3" />
              <h4 className="text-[#0A2647] font-semibold mb-2">البريد الإلكتروني</h4>
              <p className="text-gray-600 text-sm">{userInfo?.email}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <Phone className="w-8 h-8 text-[#205295] mx-auto mb-3" />
              <h4 className="text-[#0A2647] font-semibold mb-2">الهاتف</h4>
              <p className="text-gray-600 text-sm">{userInfo?.phone}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <MapPin className="w-8 h-8 text-[#205295] mx-auto mb-3" />
              <h4 className="text-[#0A2647] font-semibold mb-2">الموقع</h4>
              <p className="text-gray-600 text-sm">{userInfo?.location}</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-[#205295] text-white rounded-full font-semibold mb-4">
              من أنا
            </span>
            <h2 className="text-4xl font-black text-[#0A2647] mb-4">نبذة عني</h2>
            <p className="text-gray-600 text-lg">محترف شاب طموح يجمع بين المعرفة الأكاديمية والخبرة العملية</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-[#0A2647] mb-6">مرحباً! أنا أسامة 👋</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">{aboutInfo?.paragraph1}</p>
              <p className="text-gray-700 text-lg leading-relaxed">{aboutInfo?.paragraph2}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all">
                <div className="text-4xl font-black text-[#205295] mb-2">5+</div>
                <div className="text-gray-600 font-medium">سنوات خبرة</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all">
                <div className="text-4xl font-black text-[#205295] mb-2">3</div>
                <div className="text-gray-600 font-medium">متاجر أنشأتها</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all">
                <div className="text-4xl font-black text-[#205295] mb-2">15+</div>
                <div className="text-gray-600 font-medium">دورة تدريبية</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all">
                <div className="text-4xl font-black text-[#205295] mb-2">97%</div>
                <div className="text-gray-600 font-medium">معدل الثانوية</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-[#205295] text-white rounded-full font-semibold mb-4">
              قدراتي
            </span>
            <h2 className="text-4xl font-black text-[#0A2647] mb-4">المهارات والخبرات</h2>
            <p className="text-gray-600 text-lg">مجموعة متنوعة من المهارات التقنية والشخصية</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all border border-slate-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#2C74B3] to-[#205295] opacity-10 rounded-bl-full" />
                <h3 className="text-xl font-bold text-[#0A2647] mb-6 flex items-center gap-2">
                  <span className="text-2xl">{categoryIcons[category] || '💡'}</span>
                  مهارات {category}
                </h3>
                <ul className="space-y-3">
                  {categorySkills.map((skill) => (
                    <li
                      key={skill.id}
                      className="flex items-center gap-3 text-gray-700 hover:text-[#205295] transition-colors pr-3"
                    >
                      <span className="text-[#205295]">✦</span>
                      <span>{skill.icon}</span>
                      <span className="font-medium">{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-[#205295] text-white rounded-full font-semibold mb-4">
              مسيرتي
            </span>
            <h2 className="text-4xl font-black text-[#0A2647] mb-4">الخبرات العملية</h2>
            <p className="text-gray-600 text-lg">رحلة من الخبرات والإنجازات المتنوعة</p>
          </motion.div>

          <div className="relative">
            <div className="absolute right-1/2 transform translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#2C74B3] via-[#205295] to-[#144272] rounded-full hidden md:block" />

            <div className="space-y-12">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                >
                  <div className="hidden md:flex w-1/2"></div>
                  <div className="hidden md:flex w-1/2">
                    <div className="absolute right-1/2 transform translate-x-1/2 w-4 h-4 bg-white border-4 border-[#205295] rounded-full z-10"></div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all w-full md:w-5/12 mx-auto md:mx-0"
                  >
                    <h3 className="text-xl font-bold text-[#0A2647] mb-2">{exp.title}</h3>
                    <div className="text-[#205295] font-semibold mb-4">
                      {exp.company}
                      {exp.isCurrent && <span className="mr-2 text-green-600">(أعمل حالياً)</span>}
                    </div>
                    <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-[#205295] text-white rounded-full font-semibold mb-4">
              أعمالي
            </span>
            <h2 className="text-4xl font-black text-[#0A2647] mb-4">المشاريع والإنجازات</h2>
            <p className="text-gray-600 text-lg">مجموعة من المتاجر الإلكترونية التي أنشأتها وأديرها</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className="bg-gradient-to-r from-[#0A2647] via-[#144272] to-[#205295] p-8 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent animate-pulse" />
                  <h3 className="text-2xl font-bold mb-2 relative">{project.name}</h3>
                  <div className="text-white/90 relative">{project.category}</div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tagObj, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-[#205295]/10 text-[#205295] rounded-full text-sm font-semibold"
                      >
                        {tagObj.tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#0A2647] via-[#144272] to-[#205295] rounded-[40px] p-12 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-4">هل لديك مشروع؟ دعنا نتحدث!</h2>
              <p className="text-xl text-white/90 mb-8">
                أنا متاح دائماً لمناقشة فرص العمل الجديدة والمشاريع المثيرة
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`mailto:${userInfo?.email}`}
                  className="px-8 py-4 bg-white/15 backdrop-blur-md rounded-2xl font-bold text-lg hover:bg-white/25 transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-6 h-6" />
                  أرسل بريداً
                </a>
                <a
                  href={`tel:${userInfo?.phone}`}
                  className="px-8 py-4 bg-white/15 backdrop-blur-md rounded-2xl font-bold text-lg hover:bg-white/25 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-6 h-6" />
                  اتصل بي
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A2647] text-white py-12 px-4 text-center">
        <p className="text-white/80">
          © {new Date().getFullYear()} {userInfo?.fullName}. جميع الحقوق محفوظة.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-white/60 transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white/60 transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white/60 transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </div>
  )
}

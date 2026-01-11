'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { motion as framerMotion } from 'framer-motion'
import {
  Eye,
  Copy,
  User,
  FileText,
  Lightbulb,
  Briefcase,
  FolderOpen,
  Plus,
  Trash2,
  Save,
  ArrowRight,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'

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
  tags: { tag: string }[]
}

export default function AdminDashboard() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null)
  const [skills, setSkills] = useState<Skill[]>([])
  const [experience, setExperience] = useState<Experience[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)

  const [newSkill, setNewSkill] = useState({ name: '', category: 'تقنية', icon: '💡' })
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    description: '',
    isCurrent: false,
  })
  const [newProject, setNewProject] = useState({
    name: '',
    category: '',
    description: '',
    url: '',
    tags: '',
  })

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      setLoading(true)
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
      setSkills(skillsData)
      setExperience(expData)
      setProjects(projectsData)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('حدث خطأ في تحميل البيانات')
    } finally {
      setLoading(false)
    }
  }

  async function saveUserInfo() {
    try {
      setSaving(true)
      const res = await fetch('/api/userinfo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      })

      if (res.ok) {
        toast.success('تم حفظ المعلومات الشخصية بنجاح')
      } else {
        throw new Error('Failed to save')
      }
    } catch (error) {
      toast.error('حدث خطأ في حفظ البيانات')
    } finally {
      setSaving(false)
    }
  }

  async function saveAboutInfo() {
    try {
      setSaving(true)
      const res = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aboutInfo),
      })

      if (res.ok) {
        toast.success('تم حفظ نبذة عني بنجاح')
      } else {
        throw new Error('Failed to save')
      }
    } catch (error) {
      toast.error('حدث خطأ في حفظ البيانات')
    } finally {
      setSaving(false)
    }
  }

  async function addSkill() {
    if (!newSkill.name) {
      toast.error('يرجى إدخال اسم المهارة')
      return
    }

    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill),
      })

      if (res.ok) {
        const skill = await res.json()
        setSkills([...skills, skill])
        setNewSkill({ name: '', category: 'تقنية', icon: '💡' })
        toast.success('تم إضافة المهارة بنجاح')
      } else {
        throw new Error('Failed to add skill')
      }
    } catch (error) {
      toast.error('حدث خطأ في إضافة المهارة')
    }
  }

  async function deleteSkill(id: string) {
    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setSkills(skills.filter((s) => s.id !== id))
        toast.success('تم حذف المهارة بنجاح')
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast.error('حدث خطأ في حذف المهارة')
    }
  }

  async function addExperience() {
    if (!newExperience.title || !newExperience.company || !newExperience.description) {
      toast.error('يرجى ملء جميع الحقول المطلوبة')
      return
    }

    try {
      const res = await fetch('/api/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExperience),
      })

      if (res.ok) {
        const exp = await res.json()
        setExperience([...experience, exp])
        setNewExperience({
          title: '',
          company: '',
          description: '',
          isCurrent: false,
        })
        toast.success('تم إضافة الخبرة بنجاح')
      } else {
        throw new Error('Failed to add experience')
      }
    } catch (error) {
      toast.error('حدث خطأ في إضافة الخبرة')
    }
  }

  async function deleteExperience(id: string) {
    try {
      const res = await fetch(`/api/experience/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setExperience(experience.filter((e) => e.id !== id))
        toast.success('تم حذف الخبرة بنجاح')
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast.error('حدث خطأ في حذف الخبرة')
    }
  }

  async function addProject() {
    if (!newProject.name || !newProject.category || !newProject.description) {
      toast.error('يرجى ملء جميع الحقول المطلوبة')
      return
    }

    try {
      const tags = newProject.tags.split(',').map((t) => t.trim()).filter((t) => t)

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProject,
          tags,
        }),
      })

      if (res.ok) {
        const project = await res.json()
        setProjects([...projects, project])
        setNewProject({
          name: '',
          category: '',
          description: '',
          url: '',
          tags: '',
        })
        toast.success('تم إضافة المشروع بنجاح')
      } else {
        throw new Error('Failed to add project')
      }
    } catch (error) {
      toast.error('حدث خطأ في إضافة المشروع')
    }
  }

  async function deleteProject(id: string) {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id))
        toast.success('تم حذف المشروع بنجاح')
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast.error('حدث خطأ في حذف المشروع')
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(`${window.location.origin}/portfolio`)
    toast.success('تم نسخ رابط العرض بنجاح')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-primary animate-pulse">جاري التحميل...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0A2647] via-[#144272] to-[#205295] text-white p-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-black mb-2">لوحة التحكم - أسامة جنيدي</h1>
            <p className="text-white/90">إدارة محتوى موقعك الشخصي بسهولة</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setPreviewOpen(true)}
              variant="outline"
              className="bg-white text-[#0A2647] hover:bg-white/90"
            >
              <Eye className="w-5 h-5 ml-2" />
              معاينة الموقع
            </Button>
            <Button
              onClick={copyLink}
              variant="outline"
              className="bg-green-500 text-white border-none hover:bg-green-600"
            >
              <Copy className="w-5 h-5 ml-2" />
              نسخ رابط العرض
            </Button>
            <a href="/portfolio">
              <Button className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                <ArrowRight className="w-5 h-5 ml-2" />
                العودة للموقع
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="container mx-auto px-4 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center shadow-lg">
            <CardContent className="pt-6">
              <div className="text-4xl font-black text-[#205295] mb-2">{experience.length}</div>
              <div className="text-gray-600 font-medium">خبرة عملية</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg">
            <CardContent className="pt-6">
              <div className="text-4xl font-black text-[#205295] mb-2">{projects.length}</div>
              <div className="text-gray-600 font-medium">مشروع</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg">
            <CardContent className="pt-6">
              <div className="text-4xl font-black text-[#205295] mb-2">{skills.length}</div>
              <div className="text-gray-600 font-medium">مهارة</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 gap-2 bg-white p-2 rounded-xl shadow-sm">
            <TabsTrigger value="personal" className="gap-2">
              <User className="w-4 h-4" />
              المعلومات الشخصية
            </TabsTrigger>
            <TabsTrigger value="about" className="gap-2">
              <FileText className="w-4 h-4" />
              نبذة عني
            </TabsTrigger>
            <TabsTrigger value="skills" className="gap-2">
              <Lightbulb className="w-4 h-4" />
              المهارات
            </TabsTrigger>
            <TabsTrigger value="experience" className="gap-2">
              <Briefcase className="w-4 h-4" />
              الخبرات
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <FolderOpen className="w-4 h-4" />
              المشاريع
            </TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="personal">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <User className="w-6 h-6" />
                  المعلومات الشخصية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>الاسم الكامل</Label>
                    <Input
                      value={userInfo?.fullName || ''}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo!, fullName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>المسمى الوظيفي</Label>
                    <Input
                      value={userInfo?.jobTitle || ''}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo!, jobTitle: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>البريد الإلكتروني</Label>
                    <Input
                      type="email"
                      value={userInfo?.email || ''}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo!, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>رقم الهاتف</Label>
                    <Input
                      type="tel"
                      value={userInfo?.phone || ''}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo!, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>الموقع</Label>
                    <Input
                      value={userInfo?.location || ''}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo!, location: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>تاريخ الميلاد</Label>
                    <Input
                      type="date"
                      value={userInfo?.birthDate || ''}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo!, birthDate: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button
                  onClick={saveUserInfo}
                  disabled={saving}
                  className="bg-gradient-to-r from-[#0A2647] to-[#205295] hover:shadow-lg transition-all"
                >
                  <Save className="w-5 h-5 ml-2" />
                  {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <FileText className="w-6 h-6" />
                  نبذة عني
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>المقدمة الرئيسية</Label>
                  <Textarea
                    rows={3}
                    value={aboutInfo?.mainIntro || ''}
                    onChange={(e) =>
                      setAboutInfo({ ...aboutInfo!, mainIntro: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>الفقرة الأولى</Label>
                  <Textarea
                    rows={4}
                    value={aboutInfo?.paragraph1 || ''}
                    onChange={(e) =>
                      setAboutInfo({ ...aboutInfo!, paragraph1: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>الفقرة الثانية</Label>
                  <Textarea
                    rows={4}
                    value={aboutInfo?.paragraph2 || ''}
                    onChange={(e) =>
                      setAboutInfo({ ...aboutInfo!, paragraph2: e.target.value })
                    }
                  />
                </div>
                <Button
                  onClick={saveAboutInfo}
                  disabled={saving}
                  className="bg-gradient-to-r from-[#0A2647] to-[#205295] hover:shadow-lg transition-all"
                >
                  <Save className="w-5 h-5 ml-2" />
                  {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Lightbulb className="w-6 h-6" />
                  المهارات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add Skill Form */}
                <div className="bg-slate-50 p-6 rounded-xl space-y-4">
                  <h3 className="font-bold text-lg">إضافة مهارة جديدة</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>اسم المهارة</Label>
                      <Input
                        value={newSkill.name}
                        onChange={(e) =>
                          setNewSkill({ ...newSkill, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>التصنيف</Label>
                      <Input
                        value={newSkill.category}
                        onChange={(e) =>
                          setNewSkill({ ...newSkill, category: e.target.value })
                        }
                        placeholder="تقنية / تسويق / شخصية"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>الأيقونة</Label>
                      <Input
                        value={newSkill.icon}
                        onChange={(e) =>
                          setNewSkill({ ...newSkill, icon: e.target.value })
                        }
                        placeholder="🔥"
                      />
                    </div>
                  </div>
                  <Button onClick={addSkill} className="bg-green-500 hover:bg-green-600">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة مهارة
                  </Button>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <Card key={skill.id} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">{skill.icon}</span>
                            <span className="font-bold text-lg">{skill.name}</span>
                          </div>
                          <Badge variant="secondary">{skill.category}</Badge>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteSkill(skill.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Briefcase className="w-6 h-6" />
                  الخبرات العملية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add Experience Form */}
                <div className="bg-slate-50 p-6 rounded-xl space-y-4">
                  <h3 className="font-bold text-lg">إضافة خبرة جديدة</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>المسمى الوظيفي</Label>
                        <Input
                          value={newExperience.title}
                          onChange={(e) =>
                            setNewExperience({
                              ...newExperience,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>اسم الشركة</Label>
                        <Input
                          value={newExperience.company}
                          onChange={(e) =>
                            setNewExperience({
                              ...newExperience,
                              company: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>الوصف</Label>
                      <Textarea
                        rows={3}
                        value={newExperience.description}
                        onChange={(e) =>
                          setNewExperience({
                            ...newExperience,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={newExperience.isCurrent}
                        onCheckedChange={(checked) =>
                          setNewExperience({ ...newExperience, isCurrent: checked })
                        }
                      />
                      <Label>أعمل حالياً في هذه الوظيفة</Label>
                    </div>
                  </div>
                  <Button onClick={addExperience} className="bg-green-500 hover:bg-green-600">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة خبرة
                  </Button>
                </div>

                {/* Experience List */}
                <div className="space-y-3">
                  {experience.map((exp) => (
                    <Card key={exp.id} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-bold text-lg mb-1">{exp.title}</div>
                          <div className="text-[#205295] font-semibold mb-2">
                            {exp.company}
                            {exp.isCurrent && (
                              <Badge className="mr-2 bg-green-500">أعمل حالياً</Badge>
                            )}
                          </div>
                          <p className="text-gray-600">{exp.description}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteExperience(exp.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <FolderOpen className="w-6 h-6" />
                  المشاريع
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add Project Form */}
                <div className="bg-slate-50 p-6 rounded-xl space-y-4">
                  <h3 className="font-bold text-lg">إضافة مشروع جديد</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>اسم المشروع</Label>
                      <Input
                        value={newProject.name}
                        onChange={(e) =>
                          setNewProject({ ...newProject, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>التصنيف</Label>
                      <Input
                        value={newProject.category}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            category: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>الوصف</Label>
                    <Textarea
                      rows={3}
                      value={newProject.description}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>رابط المشروع (اختياري)</Label>
                    <Input
                      value={newProject.url}
                      onChange={(e) =>
                        setNewProject({ ...newProject, url: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>الكلمات المفتاحية (افصل بينها بفاصلة)</Label>
                    <Input
                      value={newProject.tags}
                      onChange={(e) =>
                        setNewProject({ ...newProject, tags: e.target.value })
                      }
                      placeholder="تصميم, إدارة المتجر, كتابة المحتوى"
                    />
                  </div>
                  <Button onClick={addProject} className="bg-green-500 hover:bg-green-600">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة مشروع
                  </Button>
                </div>

                {/* Projects List */}
                <div className="space-y-3">
                  {projects.map((project) => (
                    <Card key={project.id} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-bold text-lg mb-1">{project.name}</div>
                          <div className="text-[#205295] font-semibold mb-2">
                            {project.category}
                          </div>
                          <p className="text-gray-600 mb-3">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tagObj, index) => (
                              <Badge key={index} variant="secondary">
                                {tagObj.tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteProject(project.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Preview Modal */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-6xl h-[90vh] p-0">
          <div className="bg-gradient-to-r from-[#0A2647] via-[#144272] to-[#205295] text-white p-4 flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">معاينة الموقع</DialogTitle>
            <Button
              onClick={() => setPreviewOpen(false)}
              variant="outline"
              className="bg-white text-[#0A2647] hover:bg-white/90"
            >
              إغلاق
            </Button>
          </div>
          <div className="h-[calc(90vh-4rem)] overflow-auto">
            <iframe src="/portfolio" className="w-full h-full border-0" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

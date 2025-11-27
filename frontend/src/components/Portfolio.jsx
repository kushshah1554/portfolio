import { useState } from 'react';
import { Github, Linkedin, Mail, Phone, Download, Code, Database, Server, Layers, Menu, X, Send } from 'lucide-react';
import axios from 'axios';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  const skills = {
    frontend: ['React', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux','TypeScript'],
    backend: ['Node.js', 'Express.js', 'RESTful APIs', 'Authentication & Authorization'],
    database: ['MongoDB', 'MySQL'],
    tools: ['Git','GitHub','Postman', 'VS Code']
  };

  const projects = [
    {
      title: 'ImageGallery',
      description: 'Full-stack image gallery app featuring secure sign-in, cloud media storage, album tagging, and responsive browsing with upload management.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB','Cloudinary','Tailwind CSS'],
      url:"https://image-gallery-app-green.vercel.app",
      icon: <Layers className="w-6 h-6" />
    },
    {
      title: 'Task Management System',
       description: "MERN to-do list app with JWT auth, protected routes, and CRUD task management across Express/MongoDB backend and React frontend.",
      tech: ['React', 'Node.js', 'Express', 'MongoDB','Tailwind CSS'],
      url:"https://todo-app-iota-ten-47.vercel.app",
      icon: <Code className="w-6 h-6" />
    },
    {
      title: 'WorkConnect',
      description: "End-to-end job marketplace connecting workers and hirers with smart recommendations, role-based dashboards, secure authentication, job posting and applications, profile management, and Cloudinary-backed media uploads.",
      tech: ['React', 'Node.js', 'Express', 'MongoDB','Cloudinary','Tailwind CSS'],
      url:"https://work-connect-ten.vercel.app",
      icon: <Database className="w-6 h-6" />
    }
  ];

    const scrollToFeature = (e,id) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }

    
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const {data}=await axios.post("/send-email",formData);
      if(data.success){
    setFormStatus('Message sent successfully!');
    setTimeout(() => {
      setFormStatus('');
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  }
    }
     catch (error) {
      console.log("Error:", error?.response?.data?.message || error);
      setFormStatus('Message can"t be sent');
    setTimeout(() => {
      setFormStatus('');
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
      
    }
  
  };

  
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md z-50 border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              KS
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" onClick={(e)=>scrollToFeature(e,"home")} className="hover:text-blue-400 transition">Home</a>
              <a href="#about" onClick={(e)=>scrollToFeature(e,"about")} className="hover:text-blue-400 transition">About</a>
              <a href="#skills" onClick={(e)=>scrollToFeature(e,"skills")} className="hover:text-blue-400 transition">Skills</a>
              <a href="#projects" onClick={(e)=>scrollToFeature(e,"projects")} className="hover:text-blue-400 transition">Projects</a>
              <a href="#contact" onClick={(e)=>scrollToFeature(e,"contact")} className="hover:text-blue-400 transition">Contact</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-blue-500/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" onClick={(e)=>scrollToFeature(e,"home")} className="block px-3 py-2 hover:bg-gray-700 rounded">Home</a>
              <a href="#about" onClick={(e)=>scrollToFeature(e,"about")} className="block px-3 py-2 hover:bg-gray-700 rounded">About</a>
              <a href="#skills" onClick={(e)=>scrollToFeature(e,"skills")} className="block px-3 py-2 hover:bg-gray-700 rounded">Skills</a>
              <a href="#projects" onClick={(e)=>scrollToFeature(e,"projects")} className="block px-3 py-2 hover:bg-gray-700 rounded">Projects</a>
              <a href="#contact" onClick={(e)=>scrollToFeature(e,"contact")} className="block px-3 py-2 hover:bg-gray-700 rounded">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-linear-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-4xl font-bold">
              KS
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Hi, I'm <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Kush Shah</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">MERN Stack Developer</p>
          <div className="flex justify-center space-x-4 mb-8">
            <a href="https://github.com/kushshah1554" target="_blank" rel="noopener noreferrer" 
               className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/kush-shah-8186a9336" target="_blank" rel="noopener noreferrer"
               className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:skush1554@gmail.com"
               className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition">
              <Mail className="w-6 h-6" />
            </a>
          </div>
          <a href='/files/Kush_Shah_CV_0.pdf' download="KUSH_SHAH_CV">

          
          <button 
            className="bg-linear-to-r cursor-pointer from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto transition transform hover:scale-105"
          >
            <Download className="w-5 h-5" />
            Download CV
          </button>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate MERN Stack Developer with expertise in building modern, scalable web applications. 
              With a strong foundation in MongoDB, Express.js, React, and Node.js, I create full-stack solutions 
              that are both efficient and user-friendly. I'm constantly learning and adapting to new technologies 
              to deliver the best possible results.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition">
              <Code className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Frontend</h3>
              <ul className="space-y-2 text-gray-300">
                {skills.frontend.map((skill, i) => (
                  <li key={i}>• {skill}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition">
              <Server className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Backend</h3>
              <ul className="space-y-2 text-gray-300">
                {skills.backend.map((skill, i) => (
                  <li key={i}>• {skill}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition">
              <Database className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Database</h3>
              <ul className="space-y-2 text-gray-300">
                {skills.database.map((skill, i) => (
                  <li key={i}>• {skill}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition">
              <Layers className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Tools</h3>
              <ul className="space-y-2 text-gray-300">
                {skills.tools.map((skill, i) => (
                  <li key={i}>• {skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <a key={i} href={project.url} target="_blank" rel="noopener noreferrer" >
              <div  className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition hover:transform hover:scale-105">
                <div className="text-blue-400 mb-4">{project.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, j) => (
                    <span key={j} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-blue-400" />
                <div>
                  <p className="text-gray-400">Email</p>
                  <a href="mailto:skush1554@gmail.com" className="text-lg hover:text-blue-400 transition">
                    skush1554@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-cyan-400" />
                <div>
                  <p className="text-gray-400">Phone</p>
                  <p className="text-lg">9704588231</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Linkedin className="w-6 h-6 text-blue-400" />
                <div>
                  <p className="text-gray-400">LinkedIn</p>
                  <a href="https://github.com/kushshah1554" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-blue-400 transition">
                    Connect with me
                  </a>
                </div> 
              </div>
              <div className="flex items-center gap-4">
                <Github className="w-6 h-6 text-cyan-400" />
                <div>
                  <p className="text-gray-400">GitHub</p>
                  <a href="https://www.linkedin.com/in/kush-shah-8186a9336" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-cyan-400 transition">
                    View my work
                  </a>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-blue-500/20 rounded-lg focus:border-blue-500 focus:outline-none transition"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-blue-500/20 rounded-lg focus:border-blue-500 focus:outline-none transition"
              />
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
                rows="4"
                className="w-full px-4 py-3 bg-gray-800 border border-blue-500/20 rounded-lg focus:border-blue-500 focus:outline-none transition resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105 cursor-pointer "
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
              {formStatus && (
                <p className="text-center text-green-400">{formStatus}</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 border-t border-blue-500/20">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2024 Kush Shah. All rights reserved.</p>
          <p className="mt-2">Built with React & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
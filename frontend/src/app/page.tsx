"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScanLine, Search, ShieldCheck, ArrowRight, Zap, Shield, BarChart3, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-blue-50 p-8 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 mb-4">
              <Zap className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">Protección para APLV</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Gestiona la alergia a la leche de forma segura
            </h1>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Escanea códigos de barras, verifica ingredientes al instante y accede a información detallada sobre productos. Herramientas personalizadas para padres que cuidan a sus hijos con APLV.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 h-auto text-base rounded-lg">
                <ScanLine className="h-5 w-5 mr-2" />
                Comenzar a escanear
              </Button>
              <Button variant="outline" className="font-semibold px-6 py-3 h-auto text-base rounded-lg border-2">
                Saber más
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
          
          {/* Visual side */}
          <div className="hidden md:flex justify-center">
            <div className="relative w-72 h-96 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 p-1 shadow-2xl">
              <div className="w-full h-full rounded-2xl bg-white flex flex-col items-center justify-center space-y-4">
                <ScanLine className="h-16 w-16 text-emerald-600" />
                <p className="text-center font-semibold text-slate-900">Escanea y verifica</p>
                <p className="text-center text-sm text-slate-600 px-4">Resultados inmediatos sobre ingredientes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          number="50,000+" 
          label="Productos escaneados"
          icon={<BarChart3 className="h-6 w-6" />}
        />
        <StatCard 
          number="15,000+" 
          label="Padres confiables"
          icon={<Users className="h-6 w-6" />}
        />
        <StatCard 
          number="100%" 
          label="Verificados"
          icon={<Shield className="h-6 w-6" />}
        />
        <StatCard 
          number="24/7" 
          label="Disponible"
          icon={<Zap className="h-6 w-6" />}
        />
      </section>

      {/* Features Section */}
      <section>
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Herramientas diseñadas para ti
          </h2>
          <p className="text-lg text-slate-600">
            Acceso rápido a información confiable sobre alimentos seguros para APLV
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1: Scanner */}
          <FeatureCard
            icon={<ScanLine className="h-8 w-8" />}
            title="Escanear código de barras"
            description="Abre la cámara y escanea el código del producto"
            features={[
              "Detección automática",
              "Resultados inmediatos",
              "Información detallada de ingredientes",
              "Historial de escaneos"
            ]}
            bgColor="from-blue-50 to-blue-100"
            iconColor="text-blue-600"
          />

          {/* Feature 2: Search */}
          <FeatureCard
            icon={<Search className="h-8 w-8" />}
            title="Buscar productos"
            description="Encuentra información sobre productos específicos"
            features={[
              "Base de datos completa",
              "Búsqueda rápida",
              "Filtros personalizados",
              "Comparar productos"
            ]}
            bgColor="from-blue-50 to-blue-100"
            iconColor="text-blue-600"
          />

          {/* Feature 3: Safe List */}
          <FeatureCard
            icon={<ShieldCheck className="h-8 w-8" />}
            title="Lista de productos aptos"
            description="Guarda y accede a productos verificados"
            features={[
              "Lista personalizada",
              "Acceso rápido",
              "Compartir con otros",
              "Recomendaciones"
            ]}
            bgColor="from-blue-50 to-blue-100"
            iconColor="text-blue-600"
          />
        </div>
      </section>

      {/* How it works */}
      <section className="rounded-3xl border-2 border-slate-200 bg-white p-8 md:p-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
          ¿Cómo funciona?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StepCard
            number="1"
            title="Abre la cámara"
            description="Selecciona la opción de escaneo"
          />
          <div className="hidden md:flex items-center justify-center">
            <ArrowRight className="h-6 w-6 text-slate-300 rotate-90 md:rotate-0" />
          </div>
          <StepCard
            number="2"
            title="Escanea el código"
            description="Apunta el código de barras"
          />
          <div className="hidden md:flex items-center justify-center">
            <ArrowRight className="h-6 w-6 text-slate-300 rotate-90 md:rotate-0" />
          </div>
          <StepCard
            number="3"
            title="Obtén resultado"
            description="Información inmediata"
          />
          <div className="hidden md:flex items-center justify-center">
            <ArrowRight className="h-6 w-6 text-slate-300 rotate-90 md:rotate-0" />
          </div>
          <StepCard
            number="4"
            title="Guarda o comparte"
            description="Acceso futuro seguro"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
          Historias de padres
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TestimonialCard
            name="María García"
            role="Madre"
            text="APLV Helper me ha dado paz mental. Ahora puedo verificar productos en el supermercado en segundos."
            initials="MG"
          />
          <TestimonialCard
            name="Juan López"
            role="Padre"
            text="La app es intuitiva y rápida. Exactamente lo que necesitaba para cuidar a mi hijo."
            initials="JL"
          />
          <TestimonialCard
            name="Sofia Rodríguez"
            role="Abuela"
            text="Perfecto para llevar al supermercado. Tengo todo verificado antes de comprar."
            initials="SR"
          />
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-emerald-300 bg-gradient-to-r from-emerald-600 to-emerald-700 p-8 md:p-16 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Protege a tu familia hoy
        </h2>
        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
          Acceso gratuito a herramientas diseñadas para padres que cuidan a niños con APLV
        </p>
        <Button className="bg-white text-emerald-600 hover:bg-slate-100 font-semibold px-8 py-6 h-auto text-lg rounded-lg">
          <ScanLine className="h-5 w-5 mr-2" />
          Descargar app gratuita
        </Button>
      </section>
    </div>
  )
}

function StatCard({ number, label, icon }: any) {
  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 text-center hover:shadow-lg hover:border-emerald-300 transition-all group">
      <div className="h-12 w-12 rounded-lg bg-emerald-100 group-hover:bg-emerald-200 flex items-center justify-center mx-auto mb-3 text-emerald-600 transition">
        {icon}
      </div>
      <p className="text-3xl md:text-4xl font-bold text-emerald-600">{number}</p>
      <p className="text-sm text-slate-600 mt-2">{label}</p>
    </div>
  )
}

function FeatureCard({ icon, title, description, features, bgColor, iconColor }: any) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${bgColor} border-2 border-slate-200 p-6 hover:shadow-lg transition-all`}>
      <div className={`h-12 w-12 rounded-lg ${iconColor} mb-4 flex items-center justify-center bg-white`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature: string) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

function StepCard({ number, title, description }: any) {
  return (
    <div className="text-center">
      <div className="h-12 w-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-3">
        {number}
      </div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600 mt-1">{description}</p>
    </div>
  )
}

function TestimonialCard({ name, role, text, initials }: any) {
  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 hover:shadow-lg transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-12 w-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
          {initials}
        </div>
        <div>
          <p className="font-semibold text-slate-900">{name}</p>
          <p className="text-sm text-slate-600">{role}</p>
        </div>
      </div>
      <p className="text-slate-700 italic">"{text}"</p>
    </div>
  )
}

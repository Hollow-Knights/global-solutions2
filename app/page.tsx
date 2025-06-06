"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Thermometer, Shield, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1 {...fadeIn} className="text-4xl md:text-6xl font-bold mb-6">
            Monitoramento Meteorológico e Alertas
          </motion.h1>
          <motion.p
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.2 }}
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
          >
            Acompanhe em tempo real as condições climáticas e receba alertas sobre eventos extremos para proteger você e
            sua comunidade.
          </motion.p>
          <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.4 }}>
            <Link href="/pesquisa">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                Pesquisar sua cidade
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2 variants={fadeIn} className="text-3xl font-bold text-center mb-12">
            Como podemos ajudar
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={fadeIn}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-3 rounded-full mb-4">
                      <Thermometer className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Previsão Detalhada</h3>
                    <p className="text-gray-600">
                      Acesse dados meteorológicos precisos e atualizados para qualquer cidade do mundo, incluindo
                      temperatura, umidade, vento e precipitação.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-red-100 p-3 rounded-full mb-4">
                      <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Sistema de Alertas</h3>
                    <p className="text-gray-600">
                      Receba alertas sobre condições climáticas extremas que podem causar desastres naturais, com
                      recomendações de segurança personalizadas.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-green-100 p-3 rounded-full mb-4">
                      <Shield className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Prevenção de Riscos</h3>
                    <p className="text-gray-600">
                      Informações educativas sobre como se preparar e agir durante eventos climáticos extremos, ajudando
                      a proteger vidas e propriedades.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div variants={fadeIn} className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Sobre o Projeto</h2>
              <p className="text-gray-600 mb-4">
                O Weather Dashboard é um sistema de monitoramento meteorológico desenvolvido para fornecer informações precisas
                e alertas sobre condições climáticas extremas que podem causar desastres naturais.
              </p>
              <p className="text-gray-600 mb-4">
                Utilizando dados da API Open-Meteo, nosso sistema analisa padrões climáticos e identifica situações de
                risco, como chuvas intensas, ventos fortes e tempestades, oferecendo recomendações personalizadas para
                cada tipo de evento.
              </p>
              <p className="text-gray-600 mb-6">
                Nosso objetivo é contribuir para a segurança das comunidades, fornecendo informações que ajudem na
                prevenção e mitigação de desastres relacionados ao clima.
              </p>
              <Link href="/sobre">
                <Button variant="outline">Saiba mais sobre o projeto</Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 bg-gray-200 rounded-lg overflow-hidden h-80"
            >
              <div className="w-full h-full bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="py-16 bg-blue-900 text-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2 variants={fadeIn} className="text-3xl font-bold text-center mb-12">
            Impacto dos Desastres Naturais
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div variants={fadeIn}>
              <p className="text-4xl font-bold mb-2">573+</p>
              <p className="text-xl">Desastres por ano</p>
            </motion.div>
            <motion.div variants={fadeIn}>
              <p className="text-4xl font-bold mb-2">97%</p>
              <p className="text-xl">Relacionados ao clima</p>
            </motion.div>
            <motion.div variants={fadeIn}>
              <p className="text-4xl font-bold mb-2">220M</p>
              <p className="text-xl">Pessoas afetadas</p>
            </motion.div>
            <motion.div variants={fadeIn}>
              <p className="text-4xl font-bold mb-2">68%</p>
              <p className="text-xl">Redução com prevenção</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeIn}
        className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Esteja preparado para qualquer condição climática</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Pesquise sua cidade agora e receba informações meteorológicas detalhadas e alertas personalizados.
          </p>
          <Link href="/pesquisa">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              Pesquisar Cidade
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  )
}

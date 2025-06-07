"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envio do formulário
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        assunto: "",
        mensagem: "",
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Entre em Contato</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tem dúvidas sobre nosso sistema de monitoramento meteorológico? Precisa de suporte ou quer sugerir
              melhorias? Estamos aqui para ajudar!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informações de Contato */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Contato</CardTitle>
                  <CardDescription>Entre em contato conosco através dos canais abaixo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">contato@weatherdashboard.com.br</p>
                      <p className="text-gray-600">suporte@weatherdashboard.com.br</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Telefone</p>
                      <p className="text-gray-600">(11) 9999-9999</p>
                      <p className="text-gray-600">Segunda a Sexta, 8h às 18h</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Endereço</p>
                      <p className="text-gray-600">São Paulo, SP</p>
                      <p className="text-gray-600">Brasil</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Horário de Atendimento */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Horário de Atendimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Segunda - Sexta</span>
                      <span>8h às 18h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sábado</span>
                      <span>9h às 14h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domingo</span>
                      <span>Fechado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulário de Contato */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Envie sua Mensagem</CardTitle>
                  <CardDescription>
                    Preencha o formulário abaixo e entraremos em contato o mais breve possível
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="bg-green-100 text-green-800 p-4 rounded-lg">
                        <h3 className="font-bold text-lg mb-2">Mensagem Enviada com Sucesso!</h3>
                        <p>Obrigado pelo seu contato. Responderemos em breve.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nome">Nome Completo *</Label>
                          <Input
                            id="nome"
                            type="text"
                            placeholder="Seu nome completo"
                            value={formData.nome}
                            onChange={(e) => handleInputChange("nome", e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="telefone">Telefone</Label>
                          <Input
                            id="telefone"
                            type="tel"
                            placeholder="(11) 99999-9999"
                            value={formData.telefone}
                            onChange={(e) => handleInputChange("telefone", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="assunto">Assunto *</Label>
                          <Select
                            value={formData.assunto}
                            onValueChange={(value) => handleInputChange("assunto", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o assunto" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="suporte">Suporte Técnico</SelectItem>
                              <SelectItem value="duvida">Dúvida sobre o Sistema</SelectItem>
                              <SelectItem value="sugestao">Sugestão de Melhoria</SelectItem>
                              <SelectItem value="bug">Relatar Problema</SelectItem>
                              <SelectItem value="parceria">Parceria</SelectItem>
                              <SelectItem value="outro">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mensagem">Mensagem *</Label>
                        <Textarea
                          id="mensagem"
                          placeholder="Descreva sua dúvida, sugestão ou problema..."
                          rows={6}
                          value={formData.mensagem}
                          onChange={(e) => handleInputChange("mensagem", e.target.value)}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Enviar Mensagem
                          </>
                        )}
                      </Button>

                      <p className="text-sm text-gray-600">
                        * Campos obrigatórios. Seus dados serão tratados com total confidencialidade.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>Respostas para as dúvidas mais comuns sobre nosso sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Como funciona o sistema de alertas?</h4>
                  <p className="text-gray-600 text-sm">
                    Nosso sistema analisa dados meteorológicos em tempo real e emite alertas quando detecta condições
                    que podem causar desastres naturais.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Os dados são atualizados com que frequência?</h4>
                  <p className="text-gray-600 text-sm">
                    Os dados meteorológicos são atualizados a cada hora, garantindo informações sempre precisas e
                    atuais.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Posso usar o sistema para qualquer cidade?</h4>
                  <p className="text-gray-600 text-sm">
                    Sim! Nosso sistema funciona para qualquer cidade do mundo, utilizando coordenadas geográficas
                    precisas.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">O serviço é gratuito?</h4>
                  <p className="text-gray-600 text-sm">
                    Sim, nosso sistema de monitoramento meteorológico e alertas é completamente gratuito para uso
                    pessoal.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

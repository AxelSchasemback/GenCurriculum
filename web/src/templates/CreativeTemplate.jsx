import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  sidebar: {
    width: '30%',
    backgroundColor: '#5B21B6', // Púrpura
    padding: 20,
    color: 'white',
  },
  mainContent: {
    width: '70%',
    padding: 30,
  },
  header: {
    marginBottom: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  title: {
    fontSize: 14,
    color: '#E9D5FF', // Púrpura claro
    marginBottom: 20,
  },
  contactInfo: {
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contactItem: {
    fontSize: 10,
    marginBottom: 5,
    color: '#E9D5FF', // Púrpura claro
  },
  skillsSection: {
    marginTop: 30,
  },
  skillsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  skill: {
    fontSize: 10,
    marginBottom: 8,
    color: '#E9D5FF', // Púrpura claro
  },
  skillBar: {
    height: 4,
    backgroundColor: '#8B5CF6', // Púrpura medio
    marginTop: 2,
  },
  mainSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#5B21B6', // Púrpura
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#F3F4F6', // Gris claro
    paddingBottom: 5,
  },
  experienceItem: {
    marginBottom: 15,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937', // Gris oscuro
  },
  jobDetails: {
    fontSize: 10,
    color: '#6B7280', // Gris medio
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    color: '#4B5563', // Gris
    lineHeight: 1.5,
  },
  profileSummary: {
    fontSize: 10,
    color: '#4B5563', // Gris
    lineHeight: 1.6,
    marginBottom: 20,
  },
});

// Componente para el PDF
const CreativeTemplate = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Barra lateral con información de contacto y habilidades */}
      <View style={styles.sidebar}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.name || 'Nombre Completo'}</Text>
          <Text style={styles.title}>{data.personalInfo.title || 'Título Profesional'}</Text>
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.contactTitle}>Contacto</Text>
          {data.personalInfo.email && (
            <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
          )}
          {data.personalInfo.phone && (
            <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
          )}
          {data.personalInfo.location && (
            <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
          )}
          {data.personalInfo.website && (
            <Text style={styles.contactItem}>{data.personalInfo.website}</Text>
          )}
        </View>

        {/* Habilidades con barras de nivel */}
        {data.skills.length > 0 && (
          <View style={styles.skillsSection}>
            <Text style={styles.skillsTitle}>Habilidades</Text>
            {data.skills.map((skill, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
                <Text style={styles.skill}>{skill}</Text>
                <View style={[styles.skillBar, { width: `${Math.random() * 50 + 50}%` }]} />
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Contenido principal */}
      <View style={styles.mainContent}>
        {/* Perfil Profesional */}
        {data.personalInfo.summary && (
          <View style={styles.mainSection}>
            <Text style={styles.sectionTitle}>Perfil Profesional</Text>
            <Text style={styles.profileSummary}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* Sección de Experiencia */}
        {data.experience.length > 0 && (
          <View style={styles.mainSection}>
            <Text style={styles.sectionTitle}>Experiencia</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{exp.position}</Text>
                <Text style={styles.jobDetails}>
                  {exp.company} | {exp.startDate} - {exp.endDate || 'Presente'}
                </Text>
                <Text style={styles.description}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Sección de Educación */}
        {data.education.length > 0 && (
          <View style={styles.mainSection}>
            <Text style={styles.sectionTitle}>Educación</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{edu.degree}</Text>
                <Text style={styles.jobDetails}>
                  {edu.institution} | {edu.startDate} - {edu.endDate || 'Presente'}
                </Text>
                <Text style={styles.description}>{edu.description}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  </Document>
);

export default CreativeTemplate; 
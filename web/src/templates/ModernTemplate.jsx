import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    marginBottom: 5,
    fontSize: 10,
    color: '#333333',
  },
  contactItem: {
    marginRight: 15,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 5,
  },
  experienceItem: {
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  jobDetails: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    marginBottom: 5,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#F0F0F0',
    padding: '3 8',
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },
});

// Componente para el PDF
const ModernTemplate = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Encabezado con información personal */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name || 'Nombre Completo'}</Text>
        <Text style={styles.title}>{data.personalInfo.title || 'Título Profesional'}</Text>
        
        <View style={styles.contactInfo}>
          {data.personalInfo.email && (
            <Text style={styles.contactItem}>Email: {data.personalInfo.email}</Text>
          )}
          {data.personalInfo.phone && (
            <Text style={styles.contactItem}>Tel: {data.personalInfo.phone}</Text>
          )}
          {data.personalInfo.location && (
            <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
          )}
        </View>
        
        {data.personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Perfil Profesional</Text>
            <Text style={styles.description}>{data.personalInfo.summary}</Text>
          </View>
        )}
      </View>

      {/* Sección de Experiencia */}
      {data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experiencia Laboral</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{exp.position}</Text>
              <Text style={styles.jobDetails}>
                {exp.company} | {exp.startDate} - {exp.endDate}
              </Text>
              <Text style={styles.description}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Sección de Educación */}
      {data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Educación</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{edu.degree}</Text>
              <Text style={styles.jobDetails}>
                {edu.institution} | {edu.startDate} - {edu.endDate}
              </Text>
              <Text style={styles.description}>{edu.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Sección de Habilidades */}
      {data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habilidades</Text>
          <View style={styles.skills}>
            {data.skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>
                {skill}
              </Text>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);

export default ModernTemplate; 
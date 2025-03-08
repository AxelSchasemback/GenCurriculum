import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#112240',
    paddingBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  nameTitle: {
    width: '60%',
  },
  contactInfo: {
    width: '40%',
    textAlign: 'right',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#112240',
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    color: '#4A6FA5',
    marginBottom: 5,
  },
  contactItem: {
    fontSize: 10,
    marginBottom: 3,
    color: '#4A6FA5',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#112240',
    backgroundColor: '#F5F7FA',
    padding: 5,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.5,
    marginBottom: 10,
    color: '#333333',
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#112240',
  },
  jobPeriod: {
    fontSize: 10,
    color: '#4A6FA5',
    fontStyle: 'italic',
  },
  company: {
    fontSize: 11,
    color: '#333333',
    marginBottom: 3,
  },
  description: {
    fontSize: 10,
    color: '#555555',
    lineHeight: 1.5,
    marginLeft: 10,
    marginTop: 3,
  },
  bulletPoint: {
    width: 3,
    height: 3,
    backgroundColor: '#4A6FA5',
    borderRadius: 1,
    marginRight: 5,
    marginTop: 4,
  },
  bulletContainer: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#112240',
  },
  institution: {
    fontSize: 10,
    color: '#333333',
  },
  educationPeriod: {
    fontSize: 10,
    color: '#4A6FA5',
    fontStyle: 'italic',
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    fontSize: 10,
    color: '#333333',
    backgroundColor: '#F5F7FA',
    padding: '4 8',
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 4,
    borderLeftWidth: 2,
    borderLeftColor: '#4A6FA5',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 9,
    color: '#999999',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 10,
  },
});

// Componente para el PDF
const ChronologicalTemplate = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Encabezado con información personal */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.nameTitle}>
            <Text style={styles.name}>{data.personalInfo.name || 'Nombre Completo'}</Text>
            <Text style={styles.title}>{data.personalInfo.title || 'Título Profesional'}</Text>
          </View>
          <View style={styles.contactInfo}>
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
        </View>
      </View>

      {/* Perfil Profesional */}
      {data.personalInfo.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfil Profesional</Text>
          <Text style={styles.summary}>{data.personalInfo.summary}</Text>
        </View>
      )}

      {/* Sección de Experiencia */}
      {data.experience && data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experiencia Profesional</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.jobTitle}>{exp.position}</Text>
                <Text style={styles.jobPeriod}>{exp.startDate} - {exp.endDate || 'Presente'}</Text>
              </View>
              <Text style={styles.company}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</Text>
              
              {exp.description && (
                <View style={styles.bulletContainer}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.description}>{exp.description}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Sección de Educación */}
      {data.education && data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formación Académica</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.educationPeriod}>{edu.startDate} - {edu.endDate || 'Presente'}</Text>
              </View>
              <Text style={styles.institution}>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</Text>
              {edu.description && (
                <View style={styles.bulletContainer}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.description}>{edu.description}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Sección de Habilidades */}
      {data.skills && data.skills.length > 0 && (
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

      {/* Pie de página */}
      <View style={styles.footer}>
        <Text>Currículum actualizado a {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}</Text>
      </View>
    </Page>
  </Document>
);

export default ChronologicalTemplate; 
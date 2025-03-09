import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottom: '1 solid #EEEEEE',
    paddingBottom: 10,
  },
  photoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    marginBottom: 10,
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 15,
    fontWeight: 'light',
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
    fontSize: 10,
    color: '#555555',
  },
  contactItem: {
    marginRight: 15,
    marginBottom: 5,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#333333',
  },
  experienceItem: {
    marginBottom: 15,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  jobDetails: {
    fontSize: 10,
    color: '#555555',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    fontSize: 10,
    padding: '3 8',
    marginRight: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 3,
  },
});

// Componente para el PDF
const MinimalistTemplate = ({ data }) => {
  console.log("MinimalistTemplate recibió datos:", data);
  console.log("Foto en MinimalistTemplate:", data.personalInfo.photo);
  
  // Verificar si la foto es una URL base64 válida
  const hasValidPhoto = data.personalInfo.photo && 
    (data.personalInfo.photo.startsWith('data:image/') || 
     data.personalInfo.photo.startsWith('http'));
  
  // Crear una imagen con dimensiones fijas para evitar problemas de renderizado
  const processedPhoto = hasValidPhoto ? data.personalInfo.photo : null;
  
  console.log("¿Tiene foto válida?", hasValidPhoto);
  console.log("Foto procesada:", processedPhoto ? "Sí" : "No");
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado con información personal */}
        <View style={styles.header}>
          {processedPhoto && (
            <View style={styles.photoContainer}>
              <Image 
                src={processedPhoto} 
                style={styles.photo} 
                cache={false}
              />
            </View>
          )}
          <Text style={styles.name}>{data.personalInfo.name || 'Nombre Completo'}</Text>
          <Text style={styles.title}>{data.personalInfo.title || 'Título Profesional'}</Text>
          
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

        <View style={styles.divider} />

        {/* Perfil Profesional */}
        {data.personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Perfil</Text>
            <Text style={styles.description}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* Sección de Experiencia */}
        {data.experience.length > 0 && (
          <View style={styles.section}>
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
          <View style={styles.section}>
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
};

export default MinimalistTemplate; 
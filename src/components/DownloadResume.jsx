import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  PDFDownloadLink
} from '@react-pdf/renderer';
import { Button } from "@/components/ui/button";
import { FileDown, ExternalLink } from "lucide-react";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  container: {
    flexDirection: 'column',
    gap: 20,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  contact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    color: '#666',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    marginBottom: 10,
    color: '#333',
  },
  itemContainer: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  itemDetails: {
    fontSize: 10,
    color: '#666',
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#333',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#f0f0f0',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    color: '#333',
  },
  links: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5,
  },
  link: {
    fontSize: 10,
    color: '#0066cc',
    textDecoration: 'none',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
});

// Resume Document Component
const ResumePDF = ({ profile }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{profile.owner.fullName}</Text>
        <Text style={styles.title}>{profile.title}</Text>
        
        <View style={styles.contact}>
          <Text>{profile.location}</Text>
          <Text>{profile.owner.userName}</Text>
        </View>

        <View style={styles.links}>
          {profile.githubUrl && (
            <Link style={styles.link} src={profile.githubUrl}>
              <Text>GitHub</Text>
            </Link>
          )}
          {profile.linkedinUrl && (
            <Link style={styles.link} src={profile.linkedinUrl}>
              <Text>LinkedIn</Text>
            </Link>
          )}
          {profile.links?.map((link, index) => (
            <Link key={index} style={styles.link} src={link.url}>
              <Text>{link.name}</Text>
            </Link>
          ))}
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>{profile.about}</Text>
      </View>

      {/* Experience Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {profile.experience?.map((exp, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{exp.title}</Text>
            <Text style={styles.itemSubtitle}>{exp.company}</Text>
            <Text style={styles.itemDetails}>
              {exp.startDate} - {exp.endDate}
            </Text>
            <Text style={styles.description}>{exp.description}</Text>
          </View>
        ))}
      </View>

      {/* Education Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {profile.education?.map((edu, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.itemTitle}>
              {edu.degree} in {edu.field}
            </Text>
            <Text style={styles.itemSubtitle}>{edu.school}</Text>
            <Text style={styles.itemDetails}>
              Graduating: {edu.graduationYear}
            </Text>
          </View>
        ))}
      </View>

      {/* Skills Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {profile.skills?.map((skill, index) => (
            <Text key={index} style={styles.skill}>
              {skill}
            </Text>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

// Download Button Component
const DownloadResume = ({ profile }) => (
  <PDFDownloadLink
    document={<ResumePDF profile={profile} />}
    fileName={`${profile.owner.userName}-resume.pdf`}
  >
    {({ loading }) => (
      <Button 
        variant="outline" 
        className="border-2 border-gray-400 flex items-center gap-2"
        disabled={loading}
      >
        <FileDown className="w-4 h-4" />
        {loading ? 'Generating PDF...' : 'Download Resume'}
      </Button>
    )}
  </PDFDownloadLink>
);

export default DownloadResume;

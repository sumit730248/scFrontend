import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  sidebar: {
    width: "25%",
    backgroundColor: "#1e3a5f", // Dark blue color for the sidebar
    padding: 20,
    color: "white",
  },
  mainContent: {
    width: "75%",
    padding: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    alignSelf: "center",
  },
  sidebarSection: {
    marginBottom: 20,
  },
  sidebarSectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingBottom: 5,
  },
  sidebarText: {
    fontSize: 10,
    marginBottom: 5,
    color: "white",
  },
  contactItem: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
  },
  skillItem: {
    marginBottom: 5,
    flexDirection: "row",
  },
  bullet: {
    width: 10,
    fontSize: 10,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  nameHighlight: {
    color: "#1e3a5f", // Match the sidebar color
  },
  title: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    marginTop: 5,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#1e3a5f",
    paddingBottom: 5,
    marginBottom: 10,
    color: "#333",
    textTransform: "uppercase",
  },
  itemContainer: {
    marginBottom: 10,
    paddingBottom: 10,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 3,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  itemSubtitle: {
    fontSize: 11,
    color: "#666",
    marginBottom: 3,
  },
  itemDates: {
    fontSize: 10,
    color: "#666",
    textAlign: "right",
  },
  description: {
    fontSize: 10,
    lineHeight: 1.5,
    color: "#333",
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bulletDot: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    fontSize: 9,
    flex: 1,
  },
  links: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
  },
  link: {
    fontSize: 10,
    color: "#0066cc",
    textDecoration: "none",
  },
});

// Resume Document Component
const ResumePDF = ({ profile }) => {
  // For parsing the name into first and last name components
  const fullName = profile.owner.fullName || "";
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  // Format skills or provide default
  const skills = profile.skills || [];

  // Format education or provide empty array
  const education = profile.education || [];

  // Format experience or provide empty array
  const experience = profile.experience || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {/* Profile Image */}
          <Image
            src={profile.owner.avatar || "/api/placeholder/120/120"}
            style={styles.profileImage}
          />

          {/* Contact Section */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>CONTACT</Text>
            <View style={styles.contactItem}>
              <Text style={styles.sidebarText}>
                {profile.phone || profile.owner.phone || "+123-456-7890"}
              </Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.sidebarText}>
                {profile.email ||
                  profile.owner.email ||
                  profile.owner.userName + "@example.com"}
              </Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.sidebarText}>
                {profile.location || "Location not specified"}
              </Text>
            </View>
            {profile.githubUrl && (
              <View style={styles.contactItem}>
                <Text style={styles.sidebarText}>{profile.githubUrl}</Text>
              </View>
            )}
            {profile.linkedinUrl && (
              <View style={styles.contactItem}>
                <Text style={styles.sidebarText}>{profile.linkedinUrl}</Text>
              </View>
            )}
          </View>

          {/* Education Section */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>EDUCATION</Text>
            {education.length > 0 ? (
              education.map((edu, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text style={{ ...styles.sidebarText, fontWeight: "bold" }}>
                    {edu.graduationYear || "Year not specified"}
                  </Text>
                  <Text style={{ ...styles.sidebarText, fontWeight: "bold" }}>
                    {edu.school || "School not specified"}
                  </Text>
                  <Text style={styles.sidebarText}>
                    {edu.degree || "Degree"} in {edu.field || "Field"}
                  </Text>
                  {edu.gpa && (
                    <Text style={styles.sidebarText}>GPA: {edu.gpa}</Text>
                  )}
                </View>
              ))
            ) : (
              <Text style={styles.sidebarText}>
                Education details not provided
              </Text>
            )}
          </View>

          {/* Skills Section */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>SKILLS</Text>
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.bullet}>• </Text>
                  <Text style={styles.sidebarText}>{skill}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.sidebarText}>Skills not specified</Text>
            )}
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>
              <Text style={styles.nameHighlight}>{firstName}</Text>
              {lastName ? " " + lastName : ""}
            </Text>
            <Text style={styles.title}>
              {profile.title || "Title not specified"}
            </Text>
          </View>

          {/* Profile Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFILE</Text>
            <Text style={styles.description}>
              {profile.about || "No profile description provided."}
            </Text>
          </View>

          {/* Experience Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
            {experience.length > 0 ? (
              experience.map((exp, index) => (
                <View key={index} style={styles.itemContainer}>
                  <View style={styles.itemHeader}>
                    <View>
                      <Text style={styles.itemTitle}>
                        {exp.company || "Company not specified"}
                      </Text>
                      <Text style={styles.itemSubtitle}>
                        {exp.title || "Title not specified"}
                      </Text>
                    </View>
                    <Text style={styles.itemDates}>
                      {exp.startDate || "Start date"} -{" "}
                      {exp.endDate || "PRESENT"}
                    </Text>
                  </View>

                  {/* Description as bullet points */}
                  {exp.description ? (
                    exp.description.split("\n").map((point, i) => (
                      <View key={i} style={styles.bulletPoint}>
                        <Text style={styles.bulletDot}>• </Text>
                        <Text style={styles.bulletText}>{point.trim()}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.description}>
                      No description provided
                    </Text>
                  )}
                </View>
              ))
            ) : (
              <Text style={styles.description}>
                No work experience provided
              </Text>
            )}
          </View>

          {/* Additional Links Section */}
          {profile.links && profile.links.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>ADDITIONAL LINKS</Text>
              {profile.links.map((link, index) => (
                <View key={index} style={styles.bulletPoint}>
                  <Text style={styles.bulletDot}>• </Text>
                  <Link src={link.url} style={styles.link}>
                    <Text>{link.name || link.url}</Text>
                  </Link>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

// Download Button Component
const DownloadResume = ({ profile }) => (
  <PDFDownloadLink
    document={<ResumePDF profile={profile} />}
    fileName={`${profile.owner.userName || "resume"}-resume.pdf`}
  >
    {({ loading }) => (
      <Button
        variant="outline"
        className="border-2 border-gray-400 flex items-center gap-2"
        disabled={loading}
      >
        <FileDown className="w-4 h-4" />
        {loading ? "Generating PDF..." : "Download Resume"}
      </Button>
    )}
  </PDFDownloadLink>
);

export default DownloadResume;

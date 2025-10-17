import React, { useState, useCallback, memo } from "react";
import {
  FileText,
  Plus,
  Trash2,
  Upload,
  X,
  User,
  Calendar,
  Plane,
  Hotel,
  MapPin,
  CreditCard,
  Layout,
  Globe,
  Flag,
  DollarSign,
  File,
  CheckCircle,
  AlertCircle,
  Send,
} from "lucide-react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  pdf,
  Svg,
  Path,
} from "@react-pdf/renderer";
import { motion } from "framer-motion";

import logo from "../assets/images/vigovia.png";

const TABLE_HEADER_BG = "#5A11BF";
const TABLE_CELL_BG = "#FBF7FF";
const TABLE_BORDER_COLOR = "#E9D5FF";

const pdfStyles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 80,
    paddingHorizontal: 35,
    fontSize: 9,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
    color: "#374151",
  },
  sectionSpacing: {
    marginBottom: 25,
  },
  pageHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerLogo: {
    width: 130,
    height: "auto",
  },
  mainBanner: {
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: "center",
    marginBottom: 25,
    backgroundColor: "#5A11BF",
    position: "relative",
    zIndex: 1,
  },
  bannerHi: { 
    fontSize: 18, 
    marginBottom: 4,
    color: "#FFFFFF",
    fontFamily: "Helvetica-Bold",
  },  
  bannerItinerary: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
    textAlign: "center",
    color: "#FFFFFF",
  },
  bannerDuration: { 
    fontSize: 14, 
    marginBottom: 10,
    color: "#FFFFFF",
  },
  bannerIcons: { flexDirection: "row", gap: 15, marginTop: 5 },
  bannerIcon: { position: "relative", zIndex: 2 },

  tripDetailsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D8B4FE",
    marginBottom: 30,
  },
  tripDetailItem: { alignItems: "center", flex: 1 },
  tripDetailLabel: {
    fontSize: 8,
    color: "#6B7280",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  tripDetailValue: {
    fontSize: 10,
    color: "#111827",
    fontFamily: "Helvetica-Bold",
  },

  sectionTitleContainer: {
    marginBottom: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sectionTitleHighlight: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#5A11BF",
  },

  daySectionContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 25,
  },
  dayVerticalPill: {
    width: 30,
    height: 100,
    backgroundColor: "#5A11BF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  dayVerticalText: {
    transform: "rotate(-90deg)",
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  dayDetailsColumn: { alignItems: "center", width: 120, marginRight: 15 },
  dayImageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    marginBottom: 10,
  },
  daySectionImage: { width: "100%", height: "100%", objectFit: "cover" },
  dayDate: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginBottom: 5,
  },
  dayDescription: {
    fontSize: 8,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 1.4,
  },
  dayActivitiesColumn: {
    flex: 1,
    position: "relative",
    paddingTop: 5,
    paddingLeft: 10,
  },
  timelineLine: {
    position: "absolute",
    left: 4,
    top: 0,
    bottom: 0,
    width: 1.5,
    backgroundColor: "#7C3AED",
  },
  activityRow: { 
    position: "relative", 
    marginBottom: 15,
    paddingLeft: 10,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#7C3AED",
    position: "absolute",
    left: -1.5,
    top: 4,
  },
  activityTime: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#374151",
    marginBottom: 4,
    marginLeft: 10,
  },
  activityDescription: {
    fontSize: 9,
    color: "#4B5563",
    lineHeight: 1.4,
    marginBottom: 2,
    marginLeft: 10,
  },

  flightBox: {
    flexDirection: "row",
    backgroundColor: "#F3E8FF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E9D5FF",
  },
  flightDatePill: {
    backgroundColor: "#D8B4FE",
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 15,
  },
  flightDateText: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#5A11BF",
  },
  flightDetailsText: {
    flex: 1,
    fontSize: 10,
    color: "#374151",
  },
  flightNote: {
    fontSize: 8,
    color: "#6B7280",
    marginTop: 5,
    marginBottom: 20,
    lineHeight: 1.4,
  },

  paymentSummaryContainer: { flexDirection: "row", marginBottom: 15, gap: 15 },
  paymentSummaryBox: {
    flex: 1,
    backgroundColor: "#F3E8FF",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E9D5FF",
  },
  paymentSummaryLabel: {
    fontSize: 9,
    color: "#5A11BF",
    fontFamily: "Helvetica-Bold",
    marginBottom: 3,
  },
  paymentSummaryValue: {
    fontSize: 12,
    color: "#111827",
    fontFamily: "Helvetica-Bold",
  },
  paymentInstallmentBox: {
    flexDirection: "row",
    backgroundColor: "#F3E8FF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E9D5FF",
  },
  paymentInstallmentPill: {
    backgroundColor: "#D8B4FE",
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 15,
  },
  paymentInstallmentText: {
    flex: 1,
    fontSize: 10,
    color: "#374151",
  },

  customTableContainer: {
    width: "100%",
    marginBottom: 25,
    flexDirection: "row",
    gap: 8,
  },
  customColumnWrapper: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: TABLE_BORDER_COLOR,
  },
  customTableHeaderCell: {
    backgroundColor: TABLE_HEADER_BG,
    padding: 8,
    textAlign: "left",
    fontFamily: "Helvetica-Bold",
    color: "#FFFFFF",
    fontSize: 9,
    borderBottomWidth: 1,
    borderBottomColor: TABLE_BORDER_COLOR,
  },
  customTableCell: {
    backgroundColor: TABLE_CELL_BG,
    padding: 8,
    fontSize: 8,
    color: "#374151",
    textAlign: "left",
    borderColor: TABLE_BORDER_COLOR,
  },

  hotelNotes: { marginTop: 5, marginBottom: 20 },
  hotelNoteItem: {
    fontSize: 8,
    color: "#6B7280",
    lineHeight: 1.4,
    marginBottom: 2,
  },

  planPackGoContainer: {
    backgroundColor: "#5A11BF",
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 30,
    width: "50%",
    alignSelf: "center",
  },
  bookNowButtonText: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#FFFFFF",
  },

  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 35,
    fontSize: 8,
    color: "#6B7280",
  },
  footerLeft: {
    flex: 1,
    fontFamily: "Helvetica",
  },
  footerLeftTitle: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  footerMiddle: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
  },
  footerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  footerLogo: {
    width: 80,
    height: "auto",
    marginBottom: 2,
  },
  planPackGoText: {
    fontSize: 20,
    color: "#5A11BF",
    textTransform: "uppercase",
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
  },
});

const ICON_SIZE = 28;
const ICON_FILL = "#FFFFFF";

const SectionTitleWithHighlight = ({ children, style = {} }) => {
  const title = children.toString().trim();
  const words = title.split(/\s+/).filter(Boolean);

  let firstWord = "";
  let secondWord = "";
  let remainingWords = "";

  if (words.length > 0) {
    firstWord = words[0];
  }

  if (words.length > 1) {
    secondWord = words[1];
    remainingWords = words.slice(2).join(" ");
  } else {
    secondWord = firstWord;
    firstWord = "";
  }

  return (
    <View style={[pdfStyles.sectionTitleContainer, style]}>
      {firstWord && <Text style={pdfStyles.sectionTitle}>{firstWord} </Text>}
      {secondWord && (
        <Text style={pdfStyles.sectionTitleHighlight}>{secondWord} </Text>
      )}
      {remainingWords && (
        <Text style={pdfStyles.sectionTitle}>{remainingWords}</Text>
      )}
    </View>
  );
};

const CustomTable = ({ data, columns }) => {
  if (!data || data.length === 0) return null;

  return (
    <View style={pdfStyles.customTableContainer}>
      {columns.map((col, colIndex) => (
        <View
          key={col.key}
          style={[pdfStyles.customColumnWrapper, { flex: col.flex || 1 }]}
          wrap={true}
        >
          <Text style={pdfStyles.customTableHeaderCell} wrap={true}>{col.header}</Text>
          {data.map((row, rowIndex) => (
            <Text
              key={`${rowIndex}-${col.key}`}
              style={[
                pdfStyles.customTableCell,
                { textAlign: col.textAlign || "left" },
                rowIndex > 0 ? { borderTopWidth: 1 } : {},
              ]}
              wrap={true}
            >
              {row[col.key]}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};

const Footer = () => (
  <View style={pdfStyles.footer} fixed>
    <View style={pdfStyles.footerLeft}>
      <Text style={pdfStyles.footerLeftTitle}>Vigovia Tech Pvt. Ltd</Text>
      <Text>Registered Office: H-109 Cinnabar Hills,</Text>
      <Text>Links Business Park, Karnataka, India.</Text>
    </View>
    <View style={pdfStyles.footerMiddle}>
      <Text>Phone: +91-9504061112</Text>
      <Text>Email ID: utkarsh@vigovia.com</Text>
      <Text>CIN: U79110KA2024PTC191890</Text>
    </View>
    <View style={pdfStyles.footerRight}>
      <Image style={pdfStyles.footerLogo} src={logo} />
    </View>
  </View>
);

const MyDocument = ({
  formData,
  days,
  flights,
  hotels,
  importantNotes,
  scopeServices,
  inclusionSummary,
  activities,
  payments,
  visaDetails,
}) => {
  const parseActivities = (activitiesString) => {
    if (!activitiesString) return [];
    const lines = activitiesString
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const sections = [];
    let currentSection = null;
    const timeHeaders = [
      "Morning:",
      "Afternoon:",
      "Evening:",
      "Night:",
      "General:",
    ];
    lines.forEach((line) => {
      const header = timeHeaders.find((h) =>
        line.toLowerCase().startsWith(h.toLowerCase())
      );
      if (header) {
        const time = header.replace(":", "");
        currentSection = { time: time, descriptions: [] };
        sections.push(currentSection);
        const descriptionOnSameLine = line.substring(header.length).trim();
        if (descriptionOnSameLine) {
          currentSection.descriptions.push(
            descriptionOnSameLine.replace(/^-|•\s*/, "")
          );
        }
      } else if (currentSection) {
        currentSection.descriptions.push(line.replace(/^-|•\s*/, ""));
      }
    });
    return sections;
  };

  const hotelColumns = [
    { key: "city", header: "City", flex: 1.5 },
    { key: "checkIn", header: "Check In", flex: 1 },
    { key: "checkOut", header: "Check Out", flex: 1 },
    { key: "nights", header: "Nights", flex: 0.7, textAlign: "center" },
    { key: "name", header: "Hotel Name", flex: 2.5 },
  ];

  const importantNotesColumns = [
    { key: "point", header: "Point", flex: 1.5 },
    { key: "details", header: "Details", flex: 3.5 },
  ];

  const scopeServicesColumns = [
    { key: "service", header: "Service", flex: 2 },
    { key: "details", header: "Details", flex: 3 },
  ];

  const inclusionSummaryColumns = [
    { key: "category", header: "Category", flex: 1 },
    { key: "count", header: "Count", flex: 0.5, textAlign: "center" },
    { key: "details", header: "Details", flex: 3 },
    { key: "status", header: "Status / Comments", flex: 1.5 },
  ];

  const activitiesColumns = [
    { key: "city", header: "City", flex: 1.5 },
    { key: "activity", header: "Activity", flex: 2.5 },
    { key: "type", header: "Type", flex: 1 },
    { key: "timeRequired", header: "Time Required", flex: 1 },
  ];

  const visaDetailsColumns = [
    { key: "type", header: "Visa Type", flex: 1 },
    { key: "validity", header: "Validity", flex: 1 },
    { key: "processingDate", header: "Processing Date", flex: 1 },
  ];

  const visaDetailsData = [
    {
      id: 1,
      type: visaDetails.type,
      validity: visaDetails.validity,
      processingDate: visaDetails.processingDate,
    },
  ];

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.pageHeader}>
          <Image style={pdfStyles.headerLogo} src={logo} />
        </View>
        <View style={pdfStyles.mainBanner}>
          <View style={{ position: "relative", zIndex: 2, alignItems: "center" }}>
            <Text style={pdfStyles.bannerHi}>{`Hi, ${formData.customerName}!`}</Text>
            <Text style={pdfStyles.bannerItinerary}>{`${formData.arrivalCity} Itinerary`}</Text>
            <Text style={pdfStyles.bannerDuration}>{formData.duration}</Text>
            <View style={pdfStyles.bannerIcons}>
              <View style={pdfStyles.bannerIcon}>
                <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
                  <Path
                    fill={ICON_FILL}
                    d="M21 16V13.88l-7-4.58V5.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5v3.8l-7 4.58V16l.5-1.5.5 1.5V18l-1-1v-1l1-1v-1.5l3.5-1.1V15l-1.5 1.5v.5l5.5-1.5 5.5 1.5v-.5l-1.5-1.5V15l3.5 1.1V16zM3.5 3h17c.83 0 1.5.67 1.5 1.5S21.33 6 20.5 6h-17c-.83 0-1.5-.67-1.5-1.5S2.67 3 3.5 3z"
                  />
                </Svg>
              </View>
              <View style={pdfStyles.bannerIcon}>
                <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
                  <Path
                    fill={ICON_FILL}
                    d="M19 8H5c-1.1 0-2 .9-2 2v10h18V10c0-1.1-.9-2-2-2zm-6 9h-2v-4h2v4zm6-7H5v-2h14v2zM7 11h2v2H7v-2zM15 11h2v2h-2v-2z"
                  />
                </Svg>
              </View>
              <View style={pdfStyles.bannerIcon}>
                <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
                  <Path
                    fill={ICON_FILL}
                    d="M3 18h12v-2H3v2zM3 6v2h18V6H3zm0 7h18v-2H3v2z"
                  />
                </Svg>
              </View>
              <View style={pdfStyles.bannerIcon}>
                <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
                  <Path
                    fill={ICON_FILL}
                    d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5.5 10l12.99.01L18 9H5l.5 1z"
                  />
                </Svg>
              </View>
            </View>
          </View>
        </View>
        <View style={pdfStyles.tripDetailsSection}>
          <View style={pdfStyles.tripDetailItem}>
            <Text style={pdfStyles.tripDetailLabel}>Departure From:</Text>
            <Text style={pdfStyles.tripDetailValue}>
              {formData.departureCity}
            </Text>
          </View>
          <View style={pdfStyles.tripDetailItem}>
            <Text style={pdfStyles.tripDetailLabel}>Departure:</Text>
            <Text style={pdfStyles.tripDetailValue}>
              {formData.departureDate}
            </Text>
          </View>
          <View style={pdfStyles.tripDetailItem}>
            <Text style={pdfStyles.tripDetailLabel}>Arrival:</Text>
            <Text style={pdfStyles.tripDetailValue}>{formData.returnDate}</Text>
          </View>
          <View style={pdfStyles.tripDetailItem}>
            <Text style={pdfStyles.tripDetailLabel}>Destination:</Text>
            <Text style={pdfStyles.tripDetailValue}>
              {formData.arrivalCity}
            </Text>
          </View>
          <View style={pdfStyles.tripDetailItem}>
            <Text style={pdfStyles.tripDetailLabel}>Travellers:</Text>
            <Text style={pdfStyles.tripDetailValue}>{formData.travelers}</Text>
          </View>
        </View>

        <SectionTitleWithHighlight>Daily Itinerary</SectionTitleWithHighlight>
        <View>
          {days.slice(0, 1).map((day, index) => {
            const parsedActivities = parseActivities(day.activities);
            return (
              <View
                key={day.id}
                style={pdfStyles.daySectionContainer}
              >
                <View style={pdfStyles.dayVerticalPill}>
                  <Text style={pdfStyles.dayVerticalText}>{`Day ${
                    index + 1
                  }`}</Text>
                </View>
                <View style={pdfStyles.dayDetailsColumn}>
                  {day.imagePreview && (
                    <View style={pdfStyles.dayImageWrapper}>
                      <Image
                        style={pdfStyles.daySectionImage}
                        src={day.imagePreview}
                      />
                    </View>
                  )}
                  <Text style={pdfStyles.dayDate}>{day.date}</Text>
                  <Text style={pdfStyles.dayDescription}>{day.title}</Text>
                </View>
                <View style={pdfStyles.dayActivitiesColumn}>
                  <View style={pdfStyles.timelineLine} />
                  {parsedActivities.map((section, sectionIndex) => (
                    <View key={sectionIndex} style={pdfStyles.activityRow}>
                      <View style={pdfStyles.activityDot} />
                      <View>
                        <Text style={pdfStyles.activityTime}>
                          {section.time}
                        </Text>
                        {section.descriptions.map((desc, descIndex) => (
                          <Text
                            key={descIndex}
                            style={pdfStyles.activityDescription}
                          >
                            {desc}
                          </Text>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
        <Footer />
      </Page>

      <Page size="A4" style={pdfStyles.page}>
        <SectionTitleWithHighlight>Daily Itinerary (Continued)</SectionTitleWithHighlight>
        <View>
          {days.slice(1).map((day, index) => {
            const parsedActivities = parseActivities(day.activities);
            return (
              <View
                key={day.id}
                style={pdfStyles.daySectionContainer}
              >
                <View style={pdfStyles.dayVerticalPill}>
                  <Text style={pdfStyles.dayVerticalText}>{`Day ${
                    index + 2
                  }`}</Text>
                </View>
                <View style={pdfStyles.dayDetailsColumn}>
                  {day.imagePreview && (
                    <View style={pdfStyles.dayImageWrapper}>
                      <Image
                        style={pdfStyles.daySectionImage}
                        src={day.imagePreview}
                      />
                    </View>
                  )}
                  <Text style={pdfStyles.dayDate}>{day.date}</Text>
                  <Text style={pdfStyles.dayDescription}>{day.title}</Text>
                </View>
                <View style={pdfStyles.dayActivitiesColumn}>
                  <View style={pdfStyles.timelineLine} />
                  {parsedActivities.map((section, sectionIndex) => (
                    <View key={sectionIndex} style={pdfStyles.activityRow}>
                      <View style={pdfStyles.activityDot} />
                      <View>
                        <Text style={pdfStyles.activityTime}>
                          {section.time}
                        </Text>
                        {section.descriptions.map((desc, descIndex) => (
                          <Text
                            key={descIndex}
                            style={pdfStyles.activityDescription}
                          >
                            {desc}
                          </Text>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
        <Footer />
      </Page>

      <Page size="A4" style={pdfStyles.page}>
        <SectionTitleWithHighlight>Flight Summary</SectionTitleWithHighlight>
        {flights.map((flight) => (
          <View key={flight.id} style={pdfStyles.flightBox}>
            <View style={pdfStyles.flightDatePill}>
              <Text style={pdfStyles.flightDateText}>{flight.date}</Text>
            </View>
            <Text style={pdfStyles.flightDetailsText}>
              <Text
                style={{ fontFamily: "Helvetica-Bold" }}
              >{`${flight.airline} `}</Text>
              <Text>{`From ${flight.from} To ${flight.to}`}</Text>
            </Text>
          </View>
        ))}
        <Text style={[pdfStyles.flightNote, { marginBottom: 30 }]}>
          Note: All Flights Include Meals, Seat Choice (Excluding XL), And
          20kg/23kg Checked Baggage.
        </Text>

        <SectionTitleWithHighlight>Hotel Bookings</SectionTitleWithHighlight>
        <CustomTable data={hotels} columns={hotelColumns} />

        <SectionTitleWithHighlight>Hotel Notes</SectionTitleWithHighlight>
        <View style={pdfStyles.hotelNotes}>
          <Text style={pdfStyles.hotelNoteItem}>
            1. All Hotels Are Tentative and Can Be Replaced With Similar.
          </Text>
          <Text style={pdfStyles.hotelNoteItem}>
            2. Breakfast: Included For All Hotel Stays.
          </Text>
          <Text style={pdfStyles.hotelNoteItem}>
            3. All Hotels Will Be 4* And Above Category.
          </Text>
        </View>
        <Footer />
      </Page>

      <Page size="A4" style={pdfStyles.page}>
        <SectionTitleWithHighlight>Important Notes</SectionTitleWithHighlight>
        <CustomTable data={importantNotes} columns={importantNotesColumns} />

        <SectionTitleWithHighlight style={{ marginTop: 20 }}>
          Scope Of Service
        </SectionTitleWithHighlight>
        <CustomTable data={scopeServices} columns={scopeServicesColumns} />

        <SectionTitleWithHighlight style={{ marginTop: 20 }}>
          Inclusion Summary
        </SectionTitleWithHighlight>
        <CustomTable
          data={inclusionSummary}
          columns={inclusionSummaryColumns}
        />

        <Footer />
      </Page>

      <Page size="A4" style={pdfStyles.page}>
        <SectionTitleWithHighlight>Activity Table</SectionTitleWithHighlight>
        <CustomTable data={activities} columns={activitiesColumns} />

        <SectionTitleWithHighlight style={{ marginTop: 20 }}>
          Payment Plan
        </SectionTitleWithHighlight>
        <View style={pdfStyles.paymentSummaryContainer}>
          <View style={pdfStyles.paymentSummaryBox}>
            <Text style={pdfStyles.paymentSummaryLabel}>Total Amount</Text>
            <Text
              style={pdfStyles.paymentSummaryValue}
            >{`₹ ${formData.totalCost}`}</Text>
          </View>
          <View style={pdfStyles.paymentSummaryBox}>
            <Text style={pdfStyles.paymentSummaryLabel}>TCS</Text>
            <Text style={pdfStyles.paymentSummaryValue}>
              {formData.tcsStatus}
            </Text>
          </View>
        </View>
        {payments.map((payment) => (
          <View key={payment.id} style={pdfStyles.paymentInstallmentBox}>
            <View style={pdfStyles.paymentInstallmentPill}>
              <Text style={pdfStyles.flightDateText}>{payment.installment}</Text>
            </View>
            <Text style={pdfStyles.paymentInstallmentText}>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>₹{payment.amount} </Text>
              <Text>Due {payment.dueDate}</Text>
            </Text>
          </View>
        ))}

        <SectionTitleWithHighlight style={{ marginTop: 20 }}>
          Visa Details
        </SectionTitleWithHighlight>
        <CustomTable data={visaDetailsData} columns={visaDetailsColumns} />

        <Text style={pdfStyles.planPackGoText}>PLAN.PACK.GO</Text>

        <View style={pdfStyles.planPackGoContainer}>
          <Text style={pdfStyles.bookNowButtonText}>Book Now</Text>
        </View>
        <Footer />
      </Page>
    </Document>
  );
};

const ModernInput = memo(({ label, type = "text", value, onChange, placeholder, icon: Icon }) => {
  const handleChange = useCallback((e) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <div className="group space-y-3">
      <label className="block text-sm font-semibold text-gray-700 tracking-wide">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5A11BF] group-focus-within:text-[#8B5CF6] transition-colors">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full px-4 py-4 ${Icon ? 'pl-12' : 'pl-4'} bg-white/80 border-2 border-gray-200 rounded-2xl focus:border-[#5A11BF] focus:ring-4 focus:ring-[#5A11BF]/20 transition-all duration-300 backdrop-blur-sm font-medium`}
        />
      </div>
    </div>
  );
});

ModernInput.displayName = 'ModernInput';

const GlassButton = memo(({ onClick, children, variant = "primary", className = "", icon: Icon }) => {
  const handleClick = useCallback((e) => {
    e.preventDefault();
    onClick();
  }, [onClick]);

  return (
    <button
      onClick={handleClick}
      className={`
        group relative overflow-hidden px-6 py-4 rounded-2xl font-semibold transition-all duration-500 flex items-center gap-3
        ${variant === 'primary' 
          ? 'bg-gradient-to-r from-[#5A11BF] to-[#8B5CF6] text-white shadow-2xl shadow-[#5A11BF]/25 hover:shadow-3xl hover:shadow-[#5A11BF]/40 hover:scale-105' 
          : 'bg-white/80 text-[#5A11BF] border-2 border-[#5A11BF]/20 hover:bg-[#5A11BF] hover:text-white hover:border-[#5A11BF] backdrop-blur-sm'
        } ${className}
      `}
    >
      {Icon && <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />}
      {children}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
    </button>
  );
});

GlassButton.displayName = 'GlassButton';

const AnimatedCard = memo(({ icon: Icon, title, children, className = "", delay = 0 }) => (
  <div 
    className={`bg-white/80 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl shadow-black/5 overflow-hidden hover:shadow-3xl hover:shadow-[#5A11BF]/10 transition-all duration-500 hover:-translate-y-2 ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="bg-gradient-to-r from-[#5A11BF] to-[#8B5CF6] p-6">
      <div className="flex items-center gap-4">
        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
    </div>
    <div className="p-6 bg-white/50 backdrop-blur-sm">
      {children}
    </div>
  </div>
));

AnimatedCard.displayName = 'AnimatedCard';

const FloatingBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute -top-40 -right-32 w-80 h-80 bg-[#5A11BF] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
    <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-[#FF6B95] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-delayed"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#4F46E5] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
  </div>
);

const tabs = [
  { id: 'overview', icon: Layout, label: 'Overview' },
  { id: 'itinerary', icon: Calendar, label: 'Itinerary' },
  { id: 'flights', icon: Plane, label: 'Flights' },
  { id: 'hotels', icon: Hotel, label: 'Hotels' },
  { id: 'activities', icon: MapPin, label: 'Activities' },
  { id: 'payments', icon: CreditCard, label: 'Payments' },
  { id: 'documents', icon: FileText, label: 'Documents' },
];

const NavigationTabs = memo(({ activeSection, onActiveSectionChange }) => (
  <div className="flex overflow-x-auto py-4 gap-2 mb-8 scrollbar-hide">
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => onActiveSectionChange(tab.id)}
        className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 whitespace-nowrap ${
          activeSection === tab.id
            ? 'bg-[#5A11BF] text-white shadow-lg shadow-[#5A11BF]/25 transform scale-105'
            : 'bg-white/80 text-gray-600 hover:bg-white hover:text-[#5A11BF] backdrop-blur-sm border border-white/20'
        }`}
      >
        <tab.icon className="w-5 h-5" />
        {tab.label}
      </button>
    ))}
  </div>
));

NavigationTabs.displayName = 'NavigationTabs';

const TripOverview = memo(({
  customerName,
  departureCity,
  arrivalCity,
  departureDate,
  returnDate,
  travelers,
  duration,
  totalCost,
  onCustomerNameChange,
  onDepartureCityChange,
  onArrivalCityChange,
  onDepartureDateChange,
  onReturnDateChange,
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
    <AnimatedCard icon={Globe} title="Destination" className="lg:col-span-2" delay={100}>
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <div className="bg-gradient-to-br from-[#5A11BF] to-[#8B5CF6] rounded-2xl p-1">
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{arrivalCity}</h3>
              <p className="text-gray-600">{duration} • {travelers} Travelers</p>
            </div>
          </div>
        </div>
        <ModernInput 
          label="Departure City" 
          value={departureCity} 
          onChange={onDepartureCityChange} 
          icon={MapPin} 
        />
        <ModernInput 
          label="Destination City" 
          value={arrivalCity} 
          onChange={onArrivalCityChange} 
          icon={Flag} 
        />
        <ModernInput 
          label="Departure Date" 
          type="date" 
          value={departureDate} 
          onChange={onDepartureDateChange} 
          icon={Calendar}
        />
        <ModernInput 
          label="Return Date" 
          type="date" 
          value={returnDate} 
          onChange={onReturnDateChange} 
          icon={Calendar}
        />
      </div>
    </AnimatedCard>

    <AnimatedCard icon={DollarSign} title="Cost Summary" delay={200}>
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-[#5A11BF] mb-2">{totalCost}</div>
          <div className="text-sm text-gray-600">Total Package Cost</div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-lg font-bold text-gray-800">{travelers}</div>
            <div className="text-xs text-gray-600">Travelers</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-lg font-bold text-gray-800">{duration.split(' ')[0]} Days</div>
            <div className="text-xs text-gray-600">Duration</div>
          </div>
        </div>
        <ModernInput 
          label="Customer Name" 
          value={customerName} 
          onChange={onCustomerNameChange} 
          icon={User}
        />
      </div>
    </AnimatedCard>
  </div>
));

TripOverview.displayName = 'TripOverview';

const DayItinerary = memo(({ day, index, onRemove, onUpdate, onImageUpload, daysLength }) => {
  const handleTitleChange = useCallback((value) => onUpdate(day.id, 'title', value), [onUpdate, day.id]);
  const handleActivitiesChange = useCallback((e) => onUpdate(day.id, 'activities', e.target.value), [onUpdate, day.id]);
  const handleDateChange = useCallback((value) => onUpdate(day.id, 'date', value), [onUpdate, day.id]);

  return (
    <div className="bg-gradient-to-br from-white to-gray-50/80 rounded-3xl border-2 border-white/50 shadow-2xl shadow-black/5 p-6 mb-6 hover:shadow-3xl hover:shadow-[#5A11BF]/10 transition-all duration-500 group">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-[#5A11BF] to-[#8B5CF6] text-white px-4 py-2 rounded-2xl font-bold text-lg shadow-lg">
            Day {index + 1}
          </div>
          <div className="bg-[#5A11BF]/10 text-[#5A11BF] px-3 py-1 rounded-full text-sm font-semibold">
            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
        {daysLength > 1 && (
          <button onClick={() => onRemove(day.id)} className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-2xl hover:bg-red-50">
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ModernInput 
            label="Day Title" 
            value={day.title} 
            onChange={handleTitleChange}
            placeholder="Enter day title..."
          />
          
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">Activities Schedule</label>
            <textarea 
              value={day.activities}
              onChange={handleActivitiesChange}
              rows={6}
              className="w-full px-4 py-4 bg-white/80 border-2 border-gray-200 rounded-2xl focus:border-[#5A11BF] focus:ring-4 focus:ring-[#5A11BF]/20 transition-all duration-300 backdrop-blur-sm font-medium resize-none"
              placeholder="Morning:&#10;- Activity 1&#10;Afternoon:&#10;- Activity 2&#10;Evening:&#10;- Activity 3"
            />
          </div>
        </div>

        <div className="space-y-6">
          <ModernInput 
            label="Date" 
            type="date" 
            value={day.date} 
            onChange={handleDateChange}
            icon={Calendar}
          />
          
          <div className="text-center">
            <label className="block text-sm font-semibold text-gray-700 mb-4">Day Image</label>
            <label className="cursor-pointer group">
              <div className={`border-2 border-dashed rounded-2xl p-6 transition-all duration-300 group-hover:border-[#5A11BF] group-hover:bg-[#5A11BF]/5 ${day.imagePreview ? 'border-green-200 bg-green-50' : 'border-gray-300'}`}>
                {day.imagePreview ? (
                  <div className="relative">
                    <img src={day.imagePreview} alt="Preview" className="w-full h-32 object-cover rounded-xl mb-3" />
                    <div className="text-green-600 text-sm font-semibold">✓ Image Uploaded</div>
                  </div>
                ) : (
                  <div className="text-gray-400 group-hover:text-[#5A11BF] transition-colors">
                    <Upload className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-sm">Click to upload image</div>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={(e) => onImageUpload(day.id, e)} className="hidden" />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
});

DayItinerary.displayName = 'DayItinerary';

const FlightCard = memo(({ flight, onRemove, onUpdate }) => {
  const handleDateChange = useCallback((value) => onUpdate(flight.id, 'date', value), [onUpdate, flight.id]);
  const handleAirlineChange = useCallback((value) => onUpdate(flight.id, 'airline', value), [onUpdate, flight.id]);
  const handleFromChange = useCallback((value) => onUpdate(flight.id, 'from', value), [onUpdate, flight.id]);
  const handleToChange = useCallback((value) => onUpdate(flight.id, 'to', value), [onUpdate, flight.id]);
  const handleDepartureTimeChange = useCallback((value) => onUpdate(flight.id, 'departureTime', value), [onUpdate, flight.id]);
  const handleArrivalTimeChange = useCallback((value) => onUpdate(flight.id, 'arrivalTime', value), [onUpdate, flight.id]);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-white/50 mb-4">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-bold text-gray-800 text-lg">{flight.airline}</h4>
        <button onClick={() => onRemove(flight.id)} className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-xl hover:bg-red-50">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ModernInput label="Date" type="date" value={flight.date} onChange={handleDateChange} />
        <ModernInput label="Airline" value={flight.airline} onChange={handleAirlineChange} />
        <ModernInput label="From" value={flight.from} onChange={handleFromChange} placeholder="BOM" />
        <ModernInput label="To" value={flight.to} onChange={handleToChange} placeholder="SIN" />
        <ModernInput label="Departure" type="time" value={flight.departureTime} onChange={handleDepartureTimeChange} />
        <ModernInput label="Arrival" type="time" value={flight.arrivalTime} onChange={handleArrivalTimeChange} />
      </div>
    </div>
  );
});

FlightCard.displayName = 'FlightCard';

const HotelCard = memo(({ hotel, onRemove, onUpdate }) => {
  const handleNameChange = useCallback((value) => onUpdate(hotel.id, 'name', value), [onUpdate, hotel.id]);
  const handleCityChange = useCallback((value) => onUpdate(hotel.id, 'city', value), [onUpdate, hotel.id]);
  const handleRoomTypeChange = useCallback((value) => onUpdate(hotel.id, 'roomType', value), [onUpdate, hotel.id]);
  const handleCheckInChange = useCallback((value) => onUpdate(hotel.id, 'checkIn', value), [onUpdate, hotel.id]);
  const handleCheckOutChange = useCallback((value) => onUpdate(hotel.id, 'checkOut', value), [onUpdate, hotel.id]);
  const handleNightsChange = useCallback((value) => onUpdate(hotel.id, 'nights', value), [onUpdate, hotel.id]);

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-white/50 mb-4">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-bold text-gray-800 text-lg">{hotel.name}</h4>
        <button onClick={() => onRemove(hotel.id)} className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-xl hover:bg-red-50">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <ModernInput label="Hotel Name" value={hotel.name} onChange={handleNameChange} />
        <ModernInput label="City" value={hotel.city} onChange={handleCityChange} />
        <ModernInput label="Room Type" value={hotel.roomType} onChange={handleRoomTypeChange} />
        <ModernInput label="Check In" type="date" value={hotel.checkIn} onChange={handleCheckInChange} />
        <ModernInput label="Check Out" type="date" value={hotel.checkOut} onChange={handleCheckOutChange} />
        <ModernInput label="Nights" type="number" value={hotel.nights} onChange={handleNightsChange} />
      </div>
    </div>
  );
});

HotelCard.displayName = 'HotelCard';

const ActivityCard = memo(({ activity, onRemove, onUpdate }) => {
  const handleCityChange = useCallback((value) => onUpdate(activity.id, 'city', value), [onUpdate, activity.id]);
  const handleActivityChange = useCallback((value) => onUpdate(activity.id, 'activity', value), [onUpdate, activity.id]);
  const handleTypeChange = useCallback((value) => onUpdate(activity.id, 'type', value), [onUpdate, activity.id]);
  const handleTimeRequiredChange = useCallback((value) => onUpdate(activity.id, 'timeRequired', value), [onUpdate, activity.id]);

  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-white/50">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-bold text-gray-800">Activity #{activity.id}</h4>
        <button onClick={() => onRemove(activity.id)} className="text-red-500 hover:text-red-700">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ModernInput label="City" value={activity.city} onChange={handleCityChange} />
        <ModernInput label="Activity" value={activity.activity} onChange={handleActivityChange} />
        <ModernInput label="Type" value={activity.type} onChange={handleTypeChange} />
        <ModernInput label="Duration" value={activity.timeRequired} onChange={handleTimeRequiredChange} />
      </div>
    </div>
  );
});

ActivityCard.displayName = 'ActivityCard';

const PaymentCard = memo(({ payment, onRemove, onUpdate }) => {
  const handleInstallmentChange = useCallback((value) => onUpdate(payment.id, 'installment', value), [onUpdate, payment.id]);
  const handleAmountChange = useCallback((value) => onUpdate(payment.id, 'amount', value), [onUpdate, payment.id]);
  const handleDueDateChange = useCallback((value) => onUpdate(payment.id, 'dueDate', value), [onUpdate, payment.id]);
  const handleStatusChange = useCallback((value) => onUpdate(payment.id, 'status', value), [onUpdate, payment.id]);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-white/50">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-bold text-gray-800">{payment.installment}</h4>
        <button onClick={() => onRemove(payment.id)} className="text-red-500 hover:text-red-700">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ModernInput label="Installment" value={payment.installment} onChange={handleInstallmentChange} />
        <ModernInput label="Amount" value={payment.amount} onChange={handleAmountChange} />
        <ModernInput label="Due Date" type="date" value={payment.dueDate} onChange={handleDueDateChange} />
        <ModernInput label="Status" value={payment.status} onChange={handleStatusChange} />
      </div>
    </div>
  );
});

PaymentCard.displayName = 'PaymentCard';

export default function ItineraryBuilder() {
  const [formData, setFormData] = useState({
    customerName: "",
    duration: "",
    departureCity: "",
    arrivalCity: "",
    departureDate: "",
    returnDate: "",
    travelers: "",
    totalCost: "",
    tcsStatus: "",
  });

  const [days, setDays] = useState([]);

  const [flights, setFlights] = useState([]);

  const [hotels, setHotels] = useState([]);

  const [importantNotes, setImportantNotes] = useState([]);

  const [scopeServices, setScopeServices] = useState([]);

  const [inclusionSummary, setInclusionSummary] = useState([]);

  const [activities, setActivities] = useState([]);

  const [payments, setPayments] = useState([]);

  const [visaDetails, setVisaDetails] = useState({
    type: "",
    validity: "",
    processingDate: "",
    status: ""
  });

  const [activeSection, setActiveSection] = useState('overview');

  const updateFormData = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const onCustomerNameChange = useCallback((value) => updateFormData('customerName', value), [updateFormData]);
  const onDepartureCityChange = useCallback((value) => updateFormData('departureCity', value), [updateFormData]);
  const onArrivalCityChange = useCallback((value) => updateFormData('arrivalCity', value), [updateFormData]);
  const onDepartureDateChange = useCallback((value) => updateFormData('departureDate', value), [updateFormData]);
  const onReturnDateChange = useCallback((value) => updateFormData('returnDate', value), [updateFormData]);

  const addDay = useCallback(() => {
    setDays(prev => [...prev, { 
      id: Date.now(), 
      date: "", 
      title: "", 
      activities: "", 
      imagePreview: null 
    }]);
  }, []);

  const removeDay = useCallback((id) => {
    setDays(prev => prev.length > 1 ? prev.filter(day => day.id !== id) : prev);
  }, []);

  const updateDay = useCallback((id, field, value) => {
    setDays(prev => prev.map(day => day.id === id ? { ...day, [field]: value } : day));
  }, []);

  const handleImageUpload = useCallback((id, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateDay(id, "imagePreview", reader.result);
      reader.readAsDataURL(file);
    }
  }, [updateDay]);

  const addFlight = useCallback(() => {
    setFlights(prev => [...prev, { 
      id: Date.now(), 
      date: "", 
      airline: "", 
      from: "", 
      to: "",
      departureTime: "",
      arrivalTime: ""
    }]);
  }, []);

  const removeFlight = useCallback((id) => {
    setFlights(prev => prev.length > 1 ? prev.filter(f => f.id !== id) : prev);
  }, []);

  const updateFlight = useCallback((id, field, value) => {
    setFlights(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f));
  }, []);

  const addHotel = useCallback(() => {
    setHotels(prev => [...prev, {
      id: Date.now(),
      name: "",
      city: "",
      checkIn: "",
      checkOut: "",
      nights: "",
      roomType: ""
    }]);
  }, []);

  const removeHotel = useCallback((id) => {
    setHotels(prev => prev.length > 1 ? prev.filter(h => h.id !== id) : prev);
  }, []);

  const updateHotel = useCallback((id, field, value) => {
    setHotels(prev => prev.map(h => h.id === id ? { ...h, [field]: value } : h));
  }, []);

  const addImportantNote = useCallback(() => {
    setImportantNotes(prev => [...prev, { id: Date.now(), point: "", details: "" }]);
  }, []);

  const removeImportantNote = useCallback((id) => {
    setImportantNotes(prev => prev.length > 1 ? prev.filter(n => n.id !== id) : prev);
  }, []);

  const updateImportantNote = useCallback((id, field, value) => {
    setImportantNotes(prev => prev.map(n => n.id === id ? { ...n, [field]: value } : n));
  }, []);

  const addScopeService = useCallback(() => {
    setScopeServices(prev => [...prev, { id: Date.now(), service: "", details: "" }]);
  }, []);

  const removeScopeService = useCallback((id) => {
    setScopeServices(prev => prev.length > 1 ? prev.filter(s => s.id !== id) : prev);
  }, []);

  const updateScopeService = useCallback((id, field, value) => {
    setScopeServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  }, []);

  const addInclusion = useCallback(() => {
    setInclusionSummary(prev => [...prev, { 
      id: Date.now(), 
      category: "", 
      count: "", 
      details: "", 
      status: "" 
    }]);
  }, []);

  const removeInclusion = useCallback((id) => {
    setInclusionSummary(prev => prev.length > 1 ? prev.filter(i => i.id !== id) : prev);
  }, []);

  const updateInclusion = useCallback((id, field, value) => {
    setInclusionSummary(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));
  }, []);

  const addActivity = useCallback(() => {
    setActivities(prev => [...prev, { 
      id: Date.now(), 
      city: "", 
      activity: "", 
      type: "", 
      timeRequired: "",
      price: ""
    }]);
  }, []);

  const removeActivity = useCallback((id) => {
    setActivities(prev => prev.length > 1 ? prev.filter(a => a.id !== id) : prev);
  }, []);

  const updateActivity = useCallback((id, field, value) => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));
  }, []);

  const addPayment = useCallback(() => {
    setPayments(prev => [...prev, { 
      id: Date.now(), 
      installment: "", 
      amount: "", 
      dueDate: "",
      status: ""
    }]);
  }, []);

  const removePayment = useCallback((id) => {
    setPayments(prev => prev.length > 1 ? prev.filter(p => p.id !== id) : prev);
  }, []);

  const updatePayment = useCallback((id, field, value) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  }, []);

  const updateVisaDetails = useCallback((field, value) => {
    setVisaDetails(prev => ({ ...prev, [field]: value }));
  }, []);

  const generatePDF = useCallback(async () => {
    try {
      const blob = await pdf(
        <MyDocument
          formData={formData}
          days={days}
          flights={flights}
          hotels={hotels}
          importantNotes={importantNotes}
          scopeServices={scopeServices}
          inclusionSummary={inclusionSummary}
          activities={activities}
          payments={payments}
          visaDetails={visaDetails}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${formData.customerName}-itinerary-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  }, [formData, days, flights, hotels, importantNotes, scopeServices, inclusionSummary, activities, payments, visaDetails]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      <FloatingBackground />
      
      <div className="relative z-10">
        <div className="text-center py-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img src={logo} alt="logo" width={100} />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Design your perfect journey with our intelligent itinerary builder
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <NavigationTabs activeSection={activeSection} onActiveSectionChange={setActiveSection} />
          
          <div className="space-y-8">
            <TripOverview
              customerName={formData.customerName}
              departureCity={formData.departureCity}
              arrivalCity={formData.arrivalCity}
              departureDate={formData.departureDate}
              returnDate={formData.returnDate}
              travelers={formData.travelers}
              duration={formData.duration}
              totalCost={formData.totalCost}
              onCustomerNameChange={onCustomerNameChange}
              onDepartureCityChange={onDepartureCityChange}
              onArrivalCityChange={onArrivalCityChange}
              onDepartureDateChange={onDepartureDateChange}
              onReturnDateChange={onReturnDateChange}
            />

            <AnimatedCard icon={Calendar} title="Daily Itinerary" delay={300}>
              <div className="space-y-6">
                {days.map((day, index) => (
                  <DayItinerary 
                    key={day.id} 
                    day={day} 
                    index={index} 
                    onRemove={removeDay}
                    onUpdate={updateDay}
                    onImageUpload={handleImageUpload}
                    daysLength={days.length}
                  />
                ))}
                <GlassButton onClick={addDay} icon={Plus} className="w-full justify-center py-6 text-lg">
                  Add New Day
                </GlassButton>
              </div>
            </AnimatedCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnimatedCard icon={Plane} title="Flight Details" delay={400}>
                <div className="space-y-6">
                  {flights.map((flight) => (
                    <FlightCard 
                      key={flight.id} 
                      flight={flight} 
                      onRemove={removeFlight}
                      onUpdate={updateFlight}
                    />
                  ))}
                  <GlassButton onClick={addFlight} variant="secondary" icon={Plus} className="w-full justify-center">
                    Add Flight
                  </GlassButton>
                </div>
              </AnimatedCard>

              <AnimatedCard icon={Hotel} title="Hotel Stays" delay={500}>
                <div className="space-y-6">
                  {hotels.map((hotel) => (
                    <HotelCard 
                      key={hotel.id} 
                      hotel={hotel} 
                      onRemove={removeHotel}
                      onUpdate={updateHotel}
                    />
                  ))}
                  <GlassButton onClick={addHotel} variant="secondary" icon={Plus} className="w-full justify-center">
                    Add Hotel
                  </GlassButton>
                </div>
              </AnimatedCard>
            </div>

            <AnimatedCard icon={MapPin} title="Activities & Experiences" delay={600}>
              <div className="space-y-6">
                {activities.map((activity) => (
                  <ActivityCard 
                    key={activity.id} 
                    activity={activity} 
                    onRemove={removeActivity}
                    onUpdate={updateActivity}
                  />
                ))}
                <GlassButton onClick={addActivity} variant="secondary" icon={Plus} className="w-full justify-center">
                  Add Activity
                </GlassButton>
              </div>
            </AnimatedCard>

            <AnimatedCard icon={CreditCard} title="Payment Schedule" delay={700}>
              <div className="space-y-6">
                {payments.map((payment) => (
                  <PaymentCard 
                    key={payment.id} 
                    payment={payment} 
                    onRemove={removePayment}
                    onUpdate={updatePayment}
                  />
                ))}
                <GlassButton onClick={addPayment} variant="secondary" icon={Plus} className="w-full justify-center">
                  Add Payment
                </GlassButton>
              </div>
            </AnimatedCard>

            <div className="text-center py-12">
              <div className="bg-gradient-to-r flex flex-col items-center from-[#5A11BF] to-[#8B5CF6] rounded-3xl p-8 shadow-2xl shadow-[#5A11BF]/25">
                <h3 className="text-3xl font-bold text-white mb-4">Your Journey Awaits! </h3>
                <p className="text-white/80 text-lg mb-8">Generate your professional travel itinerary with one click</p>
                <GlassButton 
                  onClick={generatePDF} 
                  className="bg-white text-[#5A11BF] text-lg px-12 py-6 hover:scale-110 transform transition-all duration-500"
                  icon={FileText}
                >
                  Get Itinerary
                </GlassButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-180deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.1); }
        }
        .animate-float { animation: float 20s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 25s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 15s ease-in-out infinite; }
        .scrollbar-hide { scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
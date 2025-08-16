import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SupportScreen = ({ navigation }) => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    email: 'john.doe@example.com' // Pre-filled from user profile
  });

  const faqs = [
    {
      id: 1,
      question: 'How long does custom tailoring take?',
      answer: 'Custom tailoring typically takes 2-3 weeks from the time we receive your measurements and design preferences. Rush orders can be accommodated for an additional fee.'
    },
    {
      id: 2,
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for ready-to-wear items. Custom tailored items can be returned for alterations within 14 days if they don\'t fit properly.'
    },
    {
      id: 3,
      question: 'How do I take accurate measurements?',
      answer: 'You can use our in-app measurement guide or visit one of our partner stores. We also offer virtual measurement consultations via video call.'
    },
    {
      id: 4,
      question: 'Can I modify my order after placing it?',
      answer: 'Orders can be modified within 24 hours of placement. After that, changes may incur additional fees depending on the stage of production.'
    },
    {
      id: 5,
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship internationally to most countries. Shipping costs and delivery times vary by destination. Custom duties may apply.'
    },
    {
      id: 6,
      question: 'What fabrics do you offer?',
      answer: 'We offer a wide range of premium fabrics including wool, cotton, linen, and blends from renowned mills. You can browse our fabric collection in the app.'
    }
  ];

  const contactOptions = [
    {
      id: 1,
      title: 'Call Us',
      subtitle: '+1 (555) 123-4567',
      icon: 'call',
      color: '#4caf50',
      onPress: () => Linking.openURL('tel:+15551234567')
    },
    {
      id: 2,
      title: 'Email Support',
      subtitle: 'support@shappi-lolo.com',
      icon: 'mail',
      color: '#2196f3',
      onPress: () => Linking.openURL('mailto:support@shappi-lolo.com')
    },
    {
      id: 3,
      title: 'Live Chat',
      subtitle: 'Available 9AM - 6PM EST',
      icon: 'chatbubble',
      color: '#ff9800',
      onPress: () => Alert.alert('Live Chat', 'Live chat feature coming soon!')
    },
    {
      id: 4,
      title: 'WhatsApp',
      subtitle: '+1 (555) 123-4567',
      icon: 'logo-whatsapp',
      color: '#25d366',
      onPress: () => Linking.openURL('whatsapp://send?phone=15551234567')
    }
  ];

  const handleSendMessage = () => {
    if (!contactForm.subject || !contactForm.message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    Alert.alert(
      'Message Sent',
      'Your message has been sent successfully. We\'ll get back to you within 24 hours.',
      [{ text: 'OK', onPress: () => {
        setContactForm({ ...contactForm, subject: '', message: '' });
      }}]
    );
  };

  const FAQItem = ({ faq }) => (
    <View style={styles.faqItem}>
      <TouchableOpacity 
        style={styles.faqHeader}
        onPress={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
      >
        <Text style={styles.faqQuestion}>{faq.question}</Text>
        <Ionicons 
          name={expandedFAQ === faq.id ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color="#666" 
        />
      </TouchableOpacity>
      {expandedFAQ === faq.id && (
        <View style={styles.faqAnswer}>
          <Text style={styles.faqAnswerText}>{faq.answer}</Text>
        </View>
      )}
    </View>
  );

  const ContactOption = ({ option }) => (
    <TouchableOpacity style={styles.contactOption} onPress={option.onPress}>
      <View style={[styles.contactIcon, { backgroundColor: option.color }]}>
        <Ionicons name={option.icon} size={24} color="#fff" />
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactTitle}>{option.title}</Text>
        <Text style={styles.contactSubtitle}>{option.subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Quick Contact Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          {contactOptions.map((option) => (
            <ContactOption key={option.id} option={option} />
          ))}
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </View>

        {/* Contact Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Send us a Message</Text>
          <View style={styles.contactForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={contactForm.email}
                editable={false}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Subject *</Text>
              <TextInput
                style={styles.input}
                value={contactForm.subject}
                onChangeText={(text) => setContactForm({ ...contactForm, subject: text })}
                placeholder="What can we help you with?"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Message *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={contactForm.message}
                onChangeText={(text) => setContactForm({ ...contactForm, message: text })}
                placeholder="Please describe your issue or question in detail..."
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Ionicons name="send" size={20} color="#fff" />
              <Text style={styles.sendButtonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Additional Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Resources</Text>
          
          <TouchableOpacity style={styles.resourceItem}>
            <Ionicons name="book-outline" size={24} color="#666" />
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceTitle}>Size Guide</Text>
              <Text style={styles.resourceSubtitle}>How to measure yourself</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceItem}>
            <Ionicons name="shirt-outline" size={24} color="#666" />
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceTitle}>Care Instructions</Text>
              <Text style={styles.resourceSubtitle}>How to care for your garments</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceItem}>
            <Ionicons name="storefront-outline" size={24} color="#666" />
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceTitle}>Store Locations</Text>
              <Text style={styles.resourceSubtitle}>Find a store near you</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Operating Hours */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Support Hours</Text>
          <View style={styles.hoursContainer}>
            <View style={styles.hoursRow}>
              <Text style={styles.dayText}>Monday - Friday</Text>
              <Text style={styles.timeText}>9:00 AM - 6:00 PM EST</Text>
            </View>
            <View style={styles.hoursRow}>
              <Text style={styles.dayText}>Saturday</Text>
              <Text style={styles.timeText}>10:00 AM - 4:00 PM EST</Text>
            </View>
            <View style={styles.hoursRow}>
              <Text style={styles.dayText}>Sunday</Text>
              <Text style={styles.timeText}>Closed</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 2,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  lastSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  faqAnswer: {
    paddingBottom: 16,
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  contactForm: {
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
    color: '#666',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6200ee',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resourceInfo: {
    flex: 1,
    marginLeft: 16,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  resourceSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  hoursContainer: {
    marginTop: 8,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  timeText: {
    fontSize: 16,
    color: '#666',
  },
});

export default SupportScreen;
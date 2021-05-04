import { Component, ElementRef, EventEmitter, Input, OnInit, ViewChild, Output, KeyValueDiffers, ViewEncapsulation, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/services/tutor/categories.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { StudentService } from 'src/app/services/student/student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ObservableService } from 'src/app/services/common/Observable-service';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

// import { MatAutocompleteTrigger } from '@angular/material/autocomplete/autocomplete-trigger';

declare var $: any;

@Component({
  selector: 'app-global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.css']
})
export class GlobalHeaderComponent implements OnInit {

  testLoginUser: any
  loginData: any;

  loggedemailAddress: any;

  username: string;
  password: string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  userName: any;
  userEmailID: any;

  showAllCat = [];
  showsubCat = [];
  showsubCategories = false;
  searchbycat_SubCat_topic_Name = '';
  searchDivBox: boolean = false;
  signUp = {};
  txtsearch: any;

  forgotpasswordObj = {};
  CartDataFromCartComp: any;
  loadafterloggedPage: any;


  @Output() valueChange = new EventEmitter();

  @Input() cartlen: string[];

  @Input() openLoginmodal: any;

  @Output() cartValue = new EventEmitter<string>();
  @Input() searchvalue: any;

  @Input() openlogin: any;

  @ViewChild("myDiv") divView: ElementRef;


  @ViewChild('username') input: ElementRef<HTMLInputElement>;

  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;


  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  private elementRef: ElementRef
  messages: any[] = [];
  subscription: Subscription;

  checkUserID: any;
  category = false;


  categoryList = [
    {
      "id": 1,
      "categoryName": "Development",
      "subcategories": [
        {
          "id": 2,
          "subCategoriesName": "Web Development",
          "topic": [
            {
              "id": 3,
              "topicName": "JavaScript"
            },
            {
              "id": 4,
              "topicName": "React"
            },
            {
              "id": 5,
              "topicName": "Angular"
            },
            {
              "id": 6,
              "topicName": "CSS"
            },
            {
              "id": 7,
              "topicName": "PHP"
            },
            {
              "id": 8,
              "topicName": "Node.Js"
            },
            {
              "id": 9,
              "topicName": "Python"
            },
            {
              "id": 10,
              "topicName": "Vue JS"
            }
          ]
        },
        {
          "id": 11,
          "subCategoriesName": "Data Science",
          "topic": [
            {
              "id": 12,
              "topicName": "Python"
            },
            {
              "id": 13,
              "topicName": "Machine Learning"
            },
            {
              "id": 14,
              "topicName": "Deep Learning"
            },
            {
              "id": 15,
              "topicName": "Data Analysis"
            },
            {
              "id": 16,
              "topicName": "Artificial Intelligence"
            },
            {
              "id": 17,
              "topicName": "R"
            },
            {
              "id": 18,
              "topicName": "TensorFlow"
            },
            {
              "id": 19,
              "topicName": "Neural Networks"
            }
          ]
        },
        {
          "id": 20,
          "subCategoriesName": "Mobile Development",
          "topic": [
            {
              "id": 21,
              "topicName": "Google Flutter"
            },
            {
              "id": 22,
              "topicName": "Android Development"
            },
            {
              "id": 23,
              "topicName": "iOS Development"
            },
            {
              "id": 24,
              "topicName": "Swift"
            },
            {
              "id": 25,
              "topicName": "React Native"
            },
            {
              "id": 26,
              "topicName": "Dart Programming Language"
            },
            {
              "id": 27,
              "topicName": "Kotlin"
            },
            {
              "id": 28,
              "topicName": "Redux Framework"
            }
          ]
        },
        {
          "id": 29,
          "subCategoriesName": "Programming Languages",
          "topic": [
            {
              "id": 30,
              "topicName": "Python"
            },
            {
              "id": 31,
              "topicName": "Java"
            },
            {
              "id": 32,
              "topicName": "C#"
            },
            {
              "id": 33,
              "topicName": "C++"
            },
            {
              "id": 34,
              "topicName": "React"
            },
            {
              "id": 35,
              "topicName": "JavaScript"
            },
            {
              "id": 36,
              "topicName": "C"
            },
            {
              "id": 37,
              "topicName": "Spring Framework"
            },
            {
              "id": 38,
              "topicName": "Go Programming Language"
            }
          ]
        },
        {
          "id": 39,
          "subCategoriesName": "Game Development",
          "topic": [
            {
              "id": 40,
              "topicName": "Unity"
            },
            {
              "id": 41,
              "topicName": "Unreal Engine"
            },
            {
              "id": 42,
              "topicName": "Game Development Fundamentals"
            },
            {
              "id": 43,
              "topicName": "c#"
            },
            {
              "id": 44,
              "topicName": "3D Game Developments"
            },
            {
              "id": 45,
              "topicName": "C++"
            },
            {
              "id": 46,
              "topicName": "2D Game Developments"
            },
            {
              "id": 47,
              "topicName": "Unreal Engine Blueprints"
            },
            {
              "id": 48,
              "topicName": "Blender"
            }
          ]
        },
        {
          "id": 49,
          "subCategoriesName": "Database Design & Development",
          "topic": [
            {
              "id": 50,
              "topicName": "SQL"
            },
            {
              "id": 51,
              "topicName": "MySQL"
            },
            {
              "id": 52,
              "topicName": "Oracle SQL"
            },
            {
              "id": 53,
              "topicName": "Oracle Certification"
            },
            {
              "id": 54,
              "topicName": "Mongo DB"
            },
            {
              "id": 55,
              "topicName": "Apache Kafka"
            },
            {
              "id": 56,
              "topicName": "SQL Server"
            },
            {
              "id": 57,
              "topicName": "PostgreSQL"
            },
            {
              "id": 58,
              "topicName": "Database Management"
            }
          ]
        },
        {
          "id": 59,
          "subCategoriesName": "Software Testing",
          "topic": [
            {
              "id": 60,
              "topicName": "Selenium WebDriver"
            },
            {
              "id": 61,
              "topicName": "Java"
            },
            {
              "id": 62,
              "topicName": "Automation Testing"
            },
            {
              "id": 63,
              "topicName": "Selenium Testing Framework"
            },
            {
              "id": 64,
              "topicName": "API Testing"
            },
            {
              "id": 65,
              "topicName": "REST Assured"
            },
            {
              "id": 66,
              "topicName": "Appium"
            },
            {
              "id": 67,
              "topicName": "Cypress.io"
            }
          ]
        },
        {
          "id": 68,
          "subCategoriesName": "Software Engineering",
          "topic": [
            {
              "id": 69,
              "topicName": "AWS Certification"
            },
            {
              "id": 70,
              "topicName": "AWS Certified Developer-Associate"
            },
            {
              "id": 71,
              "topicName": "Coding Interview"
            },
            {
              "id": 72,
              "topicName": "Kubernetes"
            },
            {
              "id": 73,
              "topicName": "Certified Kubernetes Application Developer(CKAD)"
            },
            {
              "id": 74,
              "topicName": "Python"
            },
            {
              "id": 75,
              "topicName": "Microservices"
            },
            {
              "id": 76,
              "topicName": "Agile"
            },
            {
              "id": 77,
              "topicName": "Data Structures"
            }
          ]
        },
        {
          "id": 78,
          "subCategoriesName": "Development Tools",
          "topic": [
            {
              "id": 79,
              "topicName": "Docker"
            },
            {
              "id": 80,
              "topicName": "Kubernetes"
            },
            {
              "id": 81,
              "topicName": "Git"
            },
            {
              "id": 82,
              "topicName": "DevOps"
            },
            {
              "id": 83,
              "topicName": "Jenkins"
            },
            {
              "id": 84,
              "topicName": "AWS Certification"
            },
            {
              "id": 85,
              "topicName": "AWS Certified Developer-Associate"
            },
            {
              "id": 86,
              "topicName": "JIRA"
            },
            {
              "id": 87,
              "topicName": "AWS Certified Solutions Architect-Associate"
            }
          ]
        },
        {
          "id": 88,
          "subCategoriesName": "No-Code Development",
          "topic": [
            {
              "id": 89,
              "topicName": "Elementor"
            },
            {
              "id": 90,
              "topicName": "Wix"
            },
            {
              "id": 91,
              "topicName": "Software Development"
            },
            {
              "id": 92,
              "topicName": "Bubble Visual Programming"
            },
            {
              "id": 93,
              "topicName": "WordPress"
            },
            {
              "id": 94,
              "topicName": "Microsoft PowerApps"
            },
            {
              "id": 95,
              "topicName": "Microsoft Power Automate"
            },
            {
              "id": 96,
              "topicName": "Web Design"
            },
            {
              "id": 97,
              "topicName": "Startup"
            }
          ]
        }
      ]
    },
    {
      "id": 98,
      "categoryName": "Business",
      "subcategories": [
        {
          "id": 99,
          "subCategoriesName": "Entrepreneurship",
          "topic": [
            {
              "id": 100,
              "topicName": "Communications"
            },
            {
              "id": 101,
              "topicName": "Management"
            },
            {
              "id": 102,
              "topicName": "Sales"
            },
            {
              "id": 103,
              "topicName": "Business Strategy"
            },
            {
              "id": 104,
              "topicName": "Operations"
            },
            {
              "id": 105,
              "topicName": "Project Management"
            },
            {
              "id": 106,
              "topicName": "Business Law"
            },
            {
              "id": 107,
              "topicName": "Business Analytics & Intelligence"
            },
            {
              "id": 108,
              "topicName": "Human Resources"
            },
            {
              "id": 109,
              "topicName": "E-Commerce"
            },
            {
              "id": 110,
              "topicName": "Media"
            }
          ]
        },
        {
          "id": 111,
          "subCategoriesName": "Communications",
          "topic": [
            {
              "id": 112,
              "topicName": "Writing"
            },
            {
              "id": 113,
              "topicName": "Communicaion Skills"
            },
            {
              "id": 114,
              "topicName": "Presentation Skills"
            },
            {
              "id": 115,
              "topicName": "Public Speaking"
            },
            {
              "id": 116,
              "topicName": "Fiction  Writing"
            },
            {
              "id": 117,
              "topicName": "Business Writing"
            },
            {
              "id": 118,
              "topicName": "Technical Writing"
            },
            {
              "id": 119,
              "topicName": "Email Etiquette"
            },
            {
              "id": 120,
              "topicName": "Novel Writing"
            }
          ]
        },
        {
          "id": 121,
          "subCategoriesName": "Management",
          "topic": [
            {
              "id": 122,
              "topicName": "Product Management"
            },
            {
              "id": 123,
              "topicName": "Leadership"
            },
            {
              "id": 124,
              "topicName": "Management Skills"
            },
            {
              "id": 125,
              "topicName": "ISO 9001"
            },
            {
              "id": 126,
              "topicName": "Business Process Management"
            },
            {
              "id": 127,
              "topicName": "Risk Management"
            },
            {
              "id": 128,
              "topicName": "Agile"
            },
            {
              "id": 129,
              "topicName": "Quality Managemnet"
            },
            {
              "id": 130,
              "topicName": "Management Coaching"
            }
          ]
        },
        {
          "id": 131,
          "subCategoriesName": "Sales",
          "topic": [
            {
              "id": 132,
              "topicName": "Sales Skills"
            },
            {
              "id": 133,
              "topicName": "B2B Sales"
            },
            {
              "id": 134,
              "topicName": "Linkedin"
            },
            {
              "id": 135,
              "topicName": "Presentation Skills"
            },
            {
              "id": 136,
              "topicName": "Business Development"
            },
            {
              "id": 137,
              "topicName": "Lead Generation"
            },
            {
              "id": 138,
              "topicName": "Customer Success Management"
            },
            {
              "id": 139,
              "topicName": "Customer Service"
            },
            {
              "id": 140,
              "topicName": "Cold Email"
            }
          ]
        },
        {
          "id": 141,
          "subCategoriesName": "Business Strategy",
          "topic": [
            {
              "id": 142,
              "topicName": "Digital Marketing"
            },
            {
              "id": 143,
              "topicName": "Management Consulting"
            },
            {
              "id": 144,
              "topicName": "Google Ads(Adwords)"
            },
            {
              "id": 145,
              "topicName": "Business Model"
            },
            {
              "id": 146,
              "topicName": "TOGAF 9 Foundation"
            },
            {
              "id": 147,
              "topicName": "Strategic Planning"
            },
            {
              "id": 148,
              "topicName": "Innovation"
            },
            {
              "id": 149,
              "topicName": "Business Plan"
            }
          ]
        },
        {
          "id": 150,
          "subCategoriesName": "Operations",
          "topic": [
            {
              "id": 151,
              "topicName": "Six Sigma"
            },
            {
              "id": 152,
              "topicName": "Supply Chian"
            },
            {
              "id": 153,
              "topicName": "Six Sigma Green Belt"
            },
            {
              "id": 154,
              "topicName": "Quality Management"
            },
            {
              "id": 155,
              "topicName": "Robotic Process Automation"
            },
            {
              "id": 156,
              "topicName": "UiPath"
            },
            {
              "id": 157,
              "topicName": "Six Sigma Yellow Belt"
            },
            {
              "id": 158,
              "topicName": "Six Sigma Black Belt"
            },
            {
              "id": 159,
              "topicName": "Lean"
            }
          ]
        },
        {
          "id": 160,
          "subCategoriesName": "Project Management",
          "topic": [
            {
              "id": 161,
              "topicName": "PMP"
            },
            {
              "id": 162,
              "topicName": "PMBOK"
            },
            {
              "id": 163,
              "topicName": "Agile"
            },
            {
              "id": 164,
              "topicName": "Scrum"
            },
            {
              "id": 165,
              "topicName": "CAMP"
            },
            {
              "id": 166,
              "topicName": "PMI-ACP"
            },
            {
              "id": 167,
              "topicName": "Microsoft Project"
            },
            {
              "id": 168,
              "topicName": "Risk Management"
            }
          ]
        },
        {
          "id": 169,
          "subCategoriesName": "Business Law",
          "topic": [
            {
              "id": 170,
              "topicName": "GDPR"
            },
            {
              "id": 171,
              "topicName": "Contract Law"
            },
            {
              "id": 172,
              "topicName": "Law"
            },
            {
              "id": 173,
              "topicName": "LGPD Lei Geral de Protecao de Dados"
            },
            {
              "id": 174,
              "topicName": "Healthcare IT"
            },
            {
              "id": 175,
              "topicName": "Medical Device Development"
            },
            {
              "id": 176,
              "topicName": "Data Protection"
            },
            {
              "id": 177,
              "topicName": "Patent"
            }
          ]
        },
        {
          "id": 178,
          "subCategoriesName": "Business Analytics & Intelligence",
          "topic": [
            {
              "id": 179,
              "topicName": "SQL"
            },
            {
              "id": 180,
              "topicName": "Microsoft Power BI"
            },
            {
              "id": 181,
              "topicName": "Tableau"
            },
            {
              "id": 182,
              "topicName": "Business Analysis"
            },
            {
              "id": 183,
              "topicName": "Business Intelligence"
            },
            {
              "id": 184,
              "topicName": "Data Analysis"
            },
            {
              "id": 185,
              "topicName": "MySQL"
            },
            {
              "id": 186,
              "topicName": "Data Modeling"
            },
            {
              "id": 187,
              "topicName": "Big Data"
            }
          ]
        },
        {
          "id": 188,
          "subCategoriesName": "Human Resources",
          "topic": [
            {
              "id": 189,
              "topicName": "Recruiting"
            },
            {
              "id": 190,
              "topicName": "Instructional Design"
            },
            {
              "id": 191,
              "topicName": "Emotional Intelligence"
            },
            {
              "id": 192,
              "topicName": "Diversity and Inclusion"
            },
            {
              "id": 193,
              "topicName": "Conflict Management"
            },
            {
              "id": 194,
              "topicName": "HR Analytics"
            },
            {
              "id": 195,
              "topicName": "Talent Management"
            },
            {
              "id": 196,
              "topicName": "Hiring"
            }
          ]
        },
        {
          "id": 197,
          "subCategoriesName": "Industry",
          "topic": [
            {
              "id": 198,
              "topicName": "Piping"
            },
            {
              "id": 199,
              "topicName": "Electrical Engineering"
            },
            {
              "id": 200,
              "topicName": "Oil and Gas Industry"
            },
            {
              "id": 201,
              "topicName": "Freight Broker"
            },
            {
              "id": 202,
              "topicName": "Pharmacy"
            },
            {
              "id": 203,
              "topicName": "Solar Energy"
            },
            {
              "id": 204,
              "topicName": "Life Coach Training"
            },
            {
              "id": 205,
              "topicName": "Chemical Engineering"
            },
            {
              "id": 206,
              "topicName": "EPLAN Electric P8"
            }
          ]
        },
        {
          "id": 207,
          "subCategoriesName": "E-Commerce",
          "topic": [
            {
              "id": 208,
              "topicName": "Amazon FBA"
            },
            {
              "id": 209,
              "topicName": "Drop Shipping"
            },
            {
              "id": 210,
              "topicName": "Shopify"
            },
            {
              "id": 211,
              "topicName": "Selling on Amazon"
            },
            {
              "id": 212,
              "topicName": "WooCommerce"
            },
            {
              "id": 213,
              "topicName": "WordPress for Ecommerce"
            },
            {
              "id": 214,
              "topicName": "Passive Income"
            }
          ]
        },
        {
          "id": 215,
          "subCategoriesName": "Media",
          "topic": [
            {
              "id": 216,
              "topicName": "AudioBook Creation"
            },
            {
              "id": 217,
              "topicName": "Screenwriting"
            },
            {
              "id": 218,
              "topicName": "Amazon Kindle"
            },
            {
              "id": 219,
              "topicName": "Writing"
            },
            {
              "id": 220,
              "topicName": "Journalism"
            },
            {
              "id": 221,
              "topicName": "Podcasting"
            },
            {
              "id": 222,
              "topicName": "Content creation"
            },
            {
              "id": 223,
              "topicName": "After Effects"
            },
            {
              "id": 224,
              "topicName": "Motion Graphics"
            }
          ]
        },
        {
          "id": 225,
          "subCategoriesName": "Real Estate",
          "topic": [
            {
              "id": 226,
              "topicName": "Mortgage"
            },
            {
              "id": 227,
              "topicName": "Real Estste Investing"
            },
            {
              "id": 228,
              "topicName": "Mortgage"
            },
            {
              "id": 229,
              "topicName": "Construction"
            },
            {
              "id": 230,
              "topicName": "Airbnb Hosting"
            },
            {
              "id": 231,
              "topicName": "Financial Modeling"
            },
            {
              "id": 232,
              "topicName": "Property Management"
            },
            {
              "id": 233,
              "topicName": "Real Estate Flipping "
            },
            {
              "id": 234,
              "topicName": "Real Estate Marketing"
            }
          ]
        },
        {
          "id": 235,
          "subCategoriesName": "Other Business",
          "topic": [
            {
              "id": 236,
              "topicName": "QuickBooks Online"
            },
            {
              "id": 237,
              "topicName": "Transcription"
            },
            {
              "id": 238,
              "topicName": "Grant Writing"
            },
            {
              "id": 239,
              "topicName": "PowerPoint"
            },
            {
              "id": 240,
              "topicName": "Critical Thinking"
            },
            {
              "id": 241,
              "topicName": "LGPD Lei Geral de proteção de Dados"
            },
            {
              "id": 242,
              "topicName": "PMI-RMP"
            },
            {
              "id": 243,
              "topicName": "Freelance Writing "
            },
            {
              "id": 244,
              "topicName": "Akka"
            }
          ]
        }
      ]
    },
    {
      "id": 245,
      "categoryName": "Design",
      "subcategories": [
        {
          "id": 246,
          "subCategoriesName": "Web Design",
          "topic": [
            {
              "id": 247,
              "topicName": "WordPress"
            },
            {
              "id": 248,
              "topicName": "CSS"
            },
            {
              "id": 249,
              "topicName": "Mobile App Design"
            },
            {
              "id": 250,
              "topicName": "HTML"
            },
            {
              "id": 251,
              "topicName": "Photoshop"
            },
            {
              "id": 252,
              "topicName": "HTML5"
            },
            {
              "id": 253,
              "topicName": "User Interface"
            },
            {
              "id": 254,
              "topicName": "Adobe XD"
            }
          ]
        },
        {
          "id": 255,
          "subCategoriesName": "Graphic Design & Illustration",
          "topic": [
            {
              "id": 256,
              "topicName": "Graphic Design"
            },
            {
              "id": 257,
              "topicName": "Photoshop"
            },
            {
              "id": 258,
              "topicName": "Adobe Illustrator"
            },
            {
              "id": 259,
              "topicName": "Drawing"
            },
            {
              "id": 260,
              "topicName": "Digital Painting"
            },
            {
              "id": 261,
              "topicName": "InDesign"
            },
            {
              "id": 262,
              "topicName": "Canva"
            },
            {
              "id": 263,
              "topicName": "Character Design"
            },
            {
              "id": 264,
              "topicName": "Figure Drawing"
            }
          ]
        },
        {
          "id": 265,
          "subCategoriesName": "Design Tools",
          "topic": [
            {
              "id": 266,
              "topicName": "Photoshop"
            },
            {
              "id": 267,
              "topicName": "Procreate Digital Illustration App"
            },
            {
              "id": 268,
              "topicName": "After Effects"
            },
            {
              "id": 269,
              "topicName": "Adobe Illustrator"
            },
            {
              "id": 270,
              "topicName": "AutoCAD"
            },
            {
              "id": 271,
              "topicName": "Adobe Premiere"
            },
            {
              "id": 272,
              "topicName": "Digital Art"
            },
            {
              "id": 273,
              "topicName": "Video Editing"
            },
            {
              "id": 274,
              "topicName": "SOLIDWORKS"
            }
          ]
        },
        {
          "id": 275,
          "subCategoriesName": "User Experience Design",
          "topic": [
            {
              "id": 276,
              "topicName": "User Interface"
            },
            {
              "id": 277,
              "topicName": "Adobe XD"
            },
            {
              "id": 278,
              "topicName": "Figma"
            },
            {
              "id": 279,
              "topicName": "Web Design"
            },
            {
              "id": 280,
              "topicName": "Product Design"
            },
            {
              "id": 281,
              "topicName": "Mobile App Design"
            },
            {
              "id": 282,
              "topicName": "Professional Portfolio"
            },
            {
              "id": 283,
              "topicName": "Design Thinking"
            }
          ]
        },
        {
          "id": 284,
          "subCategoriesName": "Game Design",
          "topic": [
            {
              "id": 285,
              "topicName": "Unity"
            },
            {
              "id": 286,
              "topicName": "Pixel Art"
            },
            {
              "id": 287,
              "topicName": "Unreal Engine"
            },
            {
              "id": 288,
              "topicName": "Digital Painting"
            },
            {
              "id": 289,
              "topicName": "Blender"
            },
            {
              "id": 290,
              "topicName": "Game Development Fundamentals"
            },
            {
              "id": 291,
              "topicName": "VFX Visual Effects"
            },
            {
              "id": 292,
              "topicName": "Level Design"
            }
          ]
        },
        {
          "id": 293,
          "subCategoriesName": "Design Thinking",
          "topic": [
            {
              "id": 294,
              "topicName": "SOLIDWORKS"
            },
            {
              "id": 295,
              "topicName": "Marketing Plan"
            },
            {
              "id": 296,
              "topicName": "Innovation"
            },
            {
              "id": 297,
              "topicName": "User Experience Design"
            },
            {
              "id": 298,
              "topicName": "Digital Painting"
            },
            {
              "id": 299,
              "topicName": "Gamification"
            },
            {
              "id": 300,
              "topicName": "Business Strategy"
            },
            {
              "id": 301,
              "topicName": "VLSI"
            }
          ]
        },
        {
          "id": 302,
          "subCategoriesName": "3D & Animation",
          "topic": [
            {
              "id": 303,
              "topicName": "Blender"
            },
            {
              "id": 304,
              "topicName": "3D Modeling"
            },
            {
              "id": 305,
              "topicName": "After Effects"
            },
            {
              "id": 306,
              "topicName": "Motion Graphics"
            },
            {
              "id": 307,
              "topicName": "3D Animation"
            },
            {
              "id": 308,
              "topicName": "3D Texturing"
            },
            {
              "id": 309,
              "topicName": "zBrush"
            },
            {
              "id": 310,
              "topicName": "3ds Max"
            },
            {
              "id": 311,
              "topicName": "2D Animation"
            }
          ]
        },
        {
          "id": 312,
          "subCategoriesName": "Fashion Design",
          "topic": [
            {
              "id": 313,
              "topicName": "Fashion"
            },
            {
              "id": 314,
              "topicName": "Sewing"
            },
            {
              "id": 315,
              "topicName": "Adobe Illustrator"
            },
            {
              "id": 316,
              "topicName": "Jewelry Design"
            },
            {
              "id": 317,
              "topicName": "Photoshop"
            },
            {
              "id": 318,
              "topicName": "T-Shirt Design"
            },
            {
              "id": 319,
              "topicName": "Marvelous Designer"
            },
            {
              "id": 320,
              "topicName": "Anime"
            }
          ]
        },
        {
          "id": 321,
          "subCategoriesName": "Architectural Design",
          "topic": [
            {
              "id": 322,
              "topicName": "AutoCAD"
            },
            {
              "id": 323,
              "topicName": "Revit"
            },
            {
              "id": 324,
              "topicName": "SketchUp"
            },
            {
              "id": 325,
              "topicName": "Blender"
            },
            {
              "id": 326,
              "topicName": "ARCHICAD"
            },
            {
              "id": 327,
              "topicName": "Landscape Architecture"
            },
            {
              "id": 328,
              "topicName": "Architecture Fundamentals"
            },
            {
              "id": 329,
              "topicName": "Creativity"
            }
          ]
        },
        {
          "id": 330,
          "subCategoriesName": "Interior Design",
          "topic": [
            {
              "id": 331,
              "topicName": "Color Theory"
            },
            {
              "id": 332,
              "topicName": "SketchUp"
            },
            {
              "id": 333,
              "topicName": "Lighting Design"
            },
            {
              "id": 334,
              "topicName": "HVAC"
            },
            {
              "id": 335,
              "topicName": "Mechanical Engineering"
            },
            {
              "id": 336,
              "topicName": "Blender"
            },
            {
              "id": 337,
              "topicName": "Piping"
            },
            {
              "id": 338,
              "topicName": "Minimalist Lifestyle"
            }
          ]
        },
        {
          "id": 339,
          "subCategoriesName": "Other Design",
          "topic": [
            {
              "id": 340,
              "topicName": "Drawing "
            },
            {
              "id": 341,
              "topicName": "Circuit Design"
            },
            {
              "id": 342,
              "topicName": "Electronics"
            },
            {
              "id": 343,
              "topicName": "Character Design"
            },
            {
              "id": 344,
              "topicName": "Comic Book Creation"
            },
            {
              "id": 345,
              "topicName": "Digital Painting"
            },
            {
              "id": 346,
              "topicName": "Portraiture"
            },
            {
              "id": 347,
              "topicName": "Procreate Digital Illustration App"
            },
            {
              "id": 348,
              "topicName": "Pencil Drawing"
            }
          ]
        }
      ]
    },
    {
      "id": 349,
      "categoryName": "Health & Fitness",
      "subcategories": [
        {
          "id": 350,
          "subCategoriesName": "Fitness",
          "topic": [
            {
              "id": 351,
              "topicName": "Pilates"
            },
            {
              "id": 352,
              "topicName": "Teacher Training"
            },
            {
              "id": 353,
              "topicName": "Home Workout"
            },
            {
              "id": 354,
              "topicName": "Muscle Building"
            },
            {
              "id": 355,
              "topicName": "Sword"
            },
            {
              "id": 356,
              "topicName": "Kettlebell"
            },
            {
              "id": 357,
              "topicName": "Weight Loss"
            },
            {
              "id": 358,
              "topicName": "Testosterone"
            }
          ]
        },
        {
          "id": 359,
          "subCategoriesName": "General Health",
          "topic": [
            {
              "id": 360,
              "topicName": "Massage"
            },
            {
              "id": 361,
              "topicName": "Aromatherapy"
            },
            {
              "id": 362,
              "topicName": "Herbalism"
            },
            {
              "id": 363,
              "topicName": "Holistic Medicine"
            },
            {
              "id": 364,
              "topicName": "Acupressure"
            },
            {
              "id": 365,
              "topicName": "Health"
            },
            {
              "id": 366,
              "topicName": "Essential Oil"
            },
            {
              "id": 367,
              "topicName": "Reflexology"
            },
            {
              "id": 368,
              "topicName": "Tai Chi"
            }
          ]
        },
        {
          "id": 369,
          "subCategoriesName": "Sports",
          "topic": [
            {
              "id": 370,
              "topicName": "Sport Psychology"
            },
            {
              "id": 371,
              "topicName": "Tennis"
            },
            {
              "id": 372,
              "topicName": "Soccer"
            },
            {
              "id": 373,
              "topicName": "Sports Coaching"
            },
            {
              "id": 374,
              "topicName": "Golf"
            },
            {
              "id": 375,
              "topicName": "Martial Arts"
            },
            {
              "id": 376,
              "topicName": "Inline Skating"
            },
            {
              "id": 377,
              "topicName": "Swimming"
            },
            {
              "id": 378,
              "topicName": "Sports Management"
            }
          ]
        },
        {
          "id": 379,
          "subCategoriesName": "Nutrition",
          "topic": [
            {
              "id": 380,
              "topicName": "Health Coaching"
            },
            {
              "id": 381,
              "topicName": "Dieting"
            },
            {
              "id": 382,
              "topicName": "Vegan Cooking"
            },
            {
              "id": 383,
              "topicName": "Ketogenic Diet"
            },
            {
              "id": 384,
              "topicName": "Sports Nutrition"
            },
            {
              "id": 385,
              "topicName": "Weight Loss"
            },
            {
              "id": 386,
              "topicName": "Gut Health"
            },
            {
              "id": 387,
              "topicName": "Anti-Aging"
            }
          ]
        },
        {
          "id": 388,
          "subCategoriesName": "Yoga",
          "topic": [
            {
              "id": 389,
              "topicName": "Yoga for Kids"
            },
            {
              "id": 390,
              "topicName": "Pranayama"
            },
            {
              "id": 391,
              "topicName": "Chair Yoga"
            },
            {
              "id": 392,
              "topicName": "Face Yoga"
            },
            {
              "id": 393,
              "topicName": "Teacher Training"
            },
            {
              "id": 394,
              "topicName": "Kundalini"
            },
            {
              "id": 395,
              "topicName": "Meditation"
            },
            {
              "id": 396,
              "topicName": "Prenatal Yoga"
            }
          ]
        },
        {
          "id": 397,
          "subCategoriesName": "Mental Health",
          "topic": [
            {
              "id": 398,
              "topicName": "CBT"
            },
            {
              "id": 399,
              "topicName": "Art Therapy"
            },
            {
              "id": 400,
              "topicName": "Medical Terminology"
            },
            {
              "id": 401,
              "topicName": "PTSD"
            },
            {
              "id": 402,
              "topicName": "Counseling"
            },
            {
              "id": 403,
              "topicName": "Childhodd Trauma Healing"
            },
            {
              "id": 404,
              "topicName": "REBT"
            },
            {
              "id": 405,
              "topicName": "Dialectical Behavior Therapy (DBT)"
            }
          ]
        },
        {
          "id": 406,
          "subCategoriesName": "Dieting",
          "topic": [
            {
              "id": 407,
              "topicName": "Weight Loss"
            },
            {
              "id": 408,
              "topicName": "Ketogenic Diet"
            },
            {
              "id": 409,
              "topicName": "Ketosis"
            },
            {
              "id": 410,
              "topicName": "Nutrition"
            },
            {
              "id": 411,
              "topicName": "Psychology"
            },
            {
              "id": 412,
              "topicName": "Fitness"
            },
            {
              "id": 413,
              "topicName": "Fasting"
            },
            {
              "id": 414,
              "topicName": "Muscle Building"
            }
          ]
        },
        {
          "id": 415,
          "subCategoriesName": "Self Defense",
          "topic": [
            {
              "id": 416,
              "topicName": "Krav Maga"
            },
            {
              "id": 417,
              "topicName": "Self-Defense"
            },
            {
              "id": 418,
              "topicName": "Martial Arts"
            },
            {
              "id": 419,
              "topicName": "Tai Chi"
            },
            {
              "id": 420,
              "topicName": "Close Combat"
            },
            {
              "id": 421,
              "topicName": "Boxing"
            },
            {
              "id": 422,
              "topicName": "Wing Chun"
            },
            {
              "id": 423,
              "topicName": "Muay Thai"
            },
            {
              "id": 424,
              "topicName": "Karate"
            }
          ]
        },
        {
          "id": 425,
          "subCategoriesName": "Safety & First Aid",
          "topic": [
            {
              "id": 426,
              "topicName": "First Aid"
            },
            {
              "id": 427,
              "topicName": "Herbalism"
            },
            {
              "id": 428,
              "topicName": "Survival Skills"
            },
            {
              "id": 429,
              "topicName": "OSHA"
            },
            {
              "id": 430,
              "topicName": "Workplace Health and Safety"
            },
            {
              "id": 431,
              "topicName": "Food Safety"
            },
            {
              "id": 432,
              "topicName": "Personal Emergency Preparedness"
            },
            {
              "id": 433,
              "topicName": "Fire Safety"
            },
            {
              "id": 434,
              "topicName": "Risk Management"
            }
          ]
        },
        {
          "id": 435,
          "subCategoriesName": "Dance",
          "topic": [
            {
              "id": 436,
              "topicName": "Belly Dancing"
            },
            {
              "id": 437,
              "topicName": "Hip Hop Dancing"
            },
            {
              "id": 438,
              "topicName": "Salsa Dancing"
            },
            {
              "id": 439,
              "topicName": "Ballet"
            },
            {
              "id": 440,
              "topicName": "Poi Spinning"
            },
            {
              "id": 441,
              "topicName": "Bachata"
            },
            {
              "id": 442,
              "topicName": "Breakdancing"
            },
            {
              "id": 443,
              "topicName": "Tango Dance"
            }
          ]
        },
        {
          "id": 444,
          "subCategoriesName": "Meditation",
          "topic": [
            {
              "id": 445,
              "topicName": "Mindfulness"
            },
            {
              "id": 446,
              "topicName": "Sound Therapy"
            },
            {
              "id": 447,
              "topicName": "Tai Chi"
            },
            {
              "id": 448,
              "topicName": "Stress Management"
            },
            {
              "id": 449,
              "topicName": "Addiction Recovery"
            },
            {
              "id": 450,
              "topicName": "Qi Gong"
            },
            {
              "id": 451,
              "topicName": "Ashtanga Yoga"
            },
            {
              "id": 452,
              "topicName": "Yoga"
            }
          ]
        },
        {
          "id": 453,
          "subCategoriesName": "Other Health & Fitness",
          "topic": [
            {
              "id": 454,
              "topicName": "Massage"
            },
            {
              "id": 455,
              "topicName": "Sports Massage"
            },
            {
              "id": 456,
              "topicName": "Qi Gong"
            },
            {
              "id": 457,
              "topicName": "EFT"
            },
            {
              "id": 458,
              "topicName": "Holistic Medicine"
            },
            {
              "id": 459,
              "topicName": "Facial Massage"
            },
            {
              "id": 460,
              "topicName": "Makeup Artistry"
            },
            {
              "id": 461,
              "topicName": "Skincare"
            },
            {
              "id": 462,
              "topicName": "Medical Terminology"
            }
          ]
        }
      ]
    },
    {
      "id": 463,
      "categoryName": "Lifestyle",
      "subcategories": [
        {
          "id": 464,
          "subCategoriesName": "Arts & Crafts",
          "topic": [
            {
              "id": 465,
              "topicName": "Drawing"
            },
            {
              "id": 466,
              "topicName": "Watercolor Painting"
            },
            {
              "id": 467,
              "topicName": "Sketching"
            },
            {
              "id": 468,
              "topicName": "Pencil Drawing"
            },
            {
              "id": 469,
              "topicName": "Portraiture"
            },
            {
              "id": 470,
              "topicName": "Figure Drawing"
            },
            {
              "id": 471,
              "topicName": "Painting"
            },
            {
              "id": 472,
              "topicName": "Acrylic Painting"
            },
            {
              "id": 473,
              "topicName": "Soapmaking"
            }
          ]
        },
        {
          "id": 474,
          "subCategoriesName": "Beauty & Makeup",
          "topic": [
            {
              "id": 475,
              "topicName": "Makeup Artistry"
            },
            {
              "id": 476,
              "topicName": "Beauty"
            },
            {
              "id": 477,
              "topicName": "Skincare"
            },
            {
              "id": 478,
              "topicName": "Nail Art"
            },
            {
              "id": 479,
              "topicName": "Cosmetics"
            },
            {
              "id": 480,
              "topicName": "Hair Styling"
            },
            {
              "id": 481,
              "topicName": "Tattoo Art"
            },
            {
              "id": 482,
              "topicName": "Facial Massage"
            },
            {
              "id": 483,
              "topicName": "Herbalism"
            }
          ]
        },
        {
          "id": 484,
          "subCategoriesName": "Esoteric Practices",
          "topic": [
            {
              "id": 485,
              "topicName": "Reiki"
            },
            {
              "id": 486,
              "topicName": "Energy Healing"
            },
            {
              "id": 487,
              "topicName": "Tarot Reading"
            },
            {
              "id": 488,
              "topicName": "Psychic"
            },
            {
              "id": 489,
              "topicName": "Hypnotherapy"
            },
            {
              "id": 490,
              "topicName": "Crystal Energy"
            },
            {
              "id": 491,
              "topicName": "Chakra"
            },
            {
              "id": 492,
              "topicName": "Shamanism"
            },
            {
              "id": 493,
              "topicName": "Spirituality"
            }
          ]
        },
        {
          "id": 494,
          "subCategoriesName": "Food & Beverage",
          "topic": [
            {
              "id": 495,
              "topicName": "Cooking"
            },
            {
              "id": 496,
              "topicName": "Sourdough Bread Baking"
            },
            {
              "id": 497,
              "topicName": "Bread Baking"
            },
            {
              "id": 498,
              "topicName": "Baking"
            },
            {
              "id": 499,
              "topicName": "Wine Appreciation and Oenology"
            },
            {
              "id": 500,
              "topicName": "Cake Decorating"
            },
            {
              "id": 501,
              "topicName": "Pastry"
            },
            {
              "id": 502,
              "topicName": "Indian Cooking"
            },
            {
              "id": 503,
              "topicName": "Cake Baking"
            }
          ]
        },
        {
          "id": 504,
          "subCategoriesName": "Gaming",
          "topic": [
            {
              "id": 505,
              "topicName": "Chess"
            },
            {
              "id": 506,
              "topicName": "eSports"
            },
            {
              "id": 507,
              "topicName": "Poker"
            },
            {
              "id": 508,
              "topicName": "Twitch"
            },
            {
              "id": 509,
              "topicName": "Live Streaming"
            },
            {
              "id": 510,
              "topicName": "Open Broadcaster"
            },
            {
              "id": 511,
              "topicName": "League of Legends"
            },
            {
              "id": 512,
              "topicName": "Rubik's Cube"
            }
          ]
        },
        {
          "id": 513,
          "subCategoriesName": "Home Improvement",
          "topic": [
            {
              "id": 514,
              "topicName": "Electricity"
            },
            {
              "id": 515,
              "topicName": "Electrical Wiring"
            },
            {
              "id": 516,
              "topicName": "Home Repair"
            },
            {
              "id": 517,
              "topicName": "Gardening"
            },
            {
              "id": 518,
              "topicName": "Woodworking"
            },
            {
              "id": 519,
              "topicName": "Feng Shui"
            },
            {
              "id": 520,
              "topicName": "Decluttering"
            },
            {
              "id": 521,
              "topicName": "Aquaponics"
            }
          ]
        },
        {
          "id": 522,
          "subCategoriesName": "Pet Care & Training",
          "topic": [
            {
              "id": 523,
              "topicName": "Dog Training"
            },
            {
              "id": 524,
              "topicName": "Dog Behavior"
            },
            {
              "id": 525,
              "topicName": "Dog Care"
            },
            {
              "id": 526,
              "topicName": "Pet Training"
            },
            {
              "id": 527,
              "topicName": "Pet Care"
            },
            {
              "id": 528,
              "topicName": "Animal Nutrition"
            },
            {
              "id": 529,
              "topicName": "Cat Behavior"
            },
            {
              "id": 530,
              "topicName": "Horsemanship"
            },
            {
              "id": 531,
              "topicName": "Pet Business"
            }
          ]
        },
        {
          "id": 532,
          "subCategoriesName": "Travel",
          "topic": [
            {
              "id": 533,
              "topicName": "Digital Nomad"
            },
            {
              "id": 534,
              "topicName": "Travel Writing"
            },
            {
              "id": 535,
              "topicName": "Writing"
            },
            {
              "id": 536,
              "topicName": "Travel Tips"
            },
            {
              "id": 537,
              "topicName": "Travel Hacking"
            },
            {
              "id": 538,
              "topicName": "Airbnb Hosting"
            },
            {
              "id": 539,
              "topicName": "iMovie"
            },
            {
              "id": 540,
              "topicName": "Mac Basics"
            },
            {
              "id": 541,
              "topicName": "Photography"
            }
          ]
        },
        {
          "id": 542,
          "subCategoriesName": "Other Lifestyle",
          "topic": [
            {
              "id": 543,
              "topicName": "Neuro-Linguistic Programming"
            },
            {
              "id": 544,
              "topicName": "EFT"
            },
            {
              "id": 545,
              "topicName": "Meditation"
            },
            {
              "id": 546,
              "topicName": "Permaculture"
            },
            {
              "id": 547,
              "topicName": "Life Coach Training"
            },
            {
              "id": 548,
              "topicName": "Emotional Intelligence"
            },
            {
              "id": 549,
              "topicName": "Mindfulness"
            },
            {
              "id": 550,
              "topicName": "Acting"
            },
            {
              "id": 551,
              "topicName": "Herbalism"
            }
          ]
        }
      ]
    },
    {
      "id": 552,
      "categoryName": "Marketing",
      "subcategories": [
        {
          "id": 553,
          "subCategoriesName": "Digital Marketinh",
          "topic": [
            {
              "id": 554,
              "topicName": "Google Ads(Adwords)"
            },
            {
              "id": 555,
              "topicName": "Social Media Marketing"
            },
            {
              "id": 556,
              "topicName": "Google Ads(Adwords) Certification"
            },
            {
              "id": 557,
              "topicName": "Marketing Strategy"
            },
            {
              "id": 558,
              "topicName": "Internet Marketing"
            },
            {
              "id": 559,
              "topicName": "YouTube Marketing"
            },
            {
              "id": 560,
              "topicName": "Email Marketing"
            },
            {
              "id": 561,
              "topicName": "Retargeting"
            }
          ]
        },
        {
          "id": 562,
          "subCategoriesName": "Search Engine Optimization",
          "topic": [
            {
              "id": 563,
              "topicName": "SEO"
            },
            {
              "id": 564,
              "topicName": "WordPress"
            },
            {
              "id": 565,
              "topicName": "Keyword Research"
            },
            {
              "id": 566,
              "topicName": "Local SEO"
            },
            {
              "id": 567,
              "topicName": "Link Building"
            },
            {
              "id": 568,
              "topicName": "SEO Audit"
            },
            {
              "id": 569,
              "topicName": "Google my Business"
            },
            {
              "id": 570,
              "topicName": "Google Ads (Adwords)"
            },
            {
              "id": 571,
              "topicName": "YouTube Marketing"
            }
          ]
        },
        {
          "id": 572,
          "subCategoriesName": "Social Media Marketing",
          "topic": [
            {
              "id": 573,
              "topicName": "Instagram Marketing"
            },
            {
              "id": 574,
              "topicName": "Facebook Ads"
            },
            {
              "id": 575,
              "topicName": "Facebook Marketing"
            },
            {
              "id": 576,
              "topicName": "PPC Advertising"
            },
            {
              "id": 577,
              "topicName": "Social Media Management"
            },
            {
              "id": 578,
              "topicName": "TikTok Marketing"
            },
            {
              "id": 579,
              "topicName": "Instagram Photography"
            },
            {
              "id": 580,
              "topicName": "LinkedIn"
            }
          ]
        },
        {
          "id": 581,
          "subCategoriesName": "Branding",
          "topic": [
            {
              "id": 582,
              "topicName": "Business Branding"
            },
            {
              "id": 583,
              "topicName": "YouTube Audience Growth"
            },
            {
              "id": 584,
              "topicName": "YouTube Marketing"
            },
            {
              "id": 585,
              "topicName": "Personal Branding"
            },
            {
              "id": 586,
              "topicName": "Brand Management"
            },
            {
              "id": 587,
              "topicName": "Marketing Strategy"
            },
            {
              "id": 588,
              "topicName": "Graphic Design"
            },
            {
              "id": 589,
              "topicName": "Canva"
            },
            {
              "id": 590,
              "topicName": "Coaching"
            }
          ]
        },
        {
          "id": 591,
          "subCategoriesName": "Marketing Fundamentals",
          "topic": [
            {
              "id": 592,
              "topicName": "Copywriting"
            },
            {
              "id": 593,
              "topicName": "Marketing Strategy"
            },
            {
              "id": 594,
              "topicName": "Marketing Analytics"
            },
            {
              "id": 595,
              "topicName": "Marketing Plan"
            },
            {
              "id": 596,
              "topicName": "Marketing Management"
            },
            {
              "id": 597,
              "topicName": "Sales Skills"
            },
            {
              "id": 598,
              "topicName": "Event Planning"
            },
            {
              "id": 599,
              "topicName": "Neuromarketing"
            },
            {
              "id": 600,
              "topicName": "Career Coaching"
            }
          ]
        },
        {
          "id": 601,
          "subCategoriesName": "Marketing Analytics & Automation",
          "topic": [
            {
              "id": 602,
              "topicName": "Google Analytics"
            },
            {
              "id": 603,
              "topicName": "Google Analytics Individual Qualification (IQ)"
            },
            {
              "id": 604,
              "topicName": "Data Analysis"
            },
            {
              "id": 605,
              "topicName": "Marketing Analytics"
            },
            {
              "id": 606,
              "topicName": "SQL"
            },
            {
              "id": 607,
              "topicName": "Google Tag Manager"
            },
            {
              "id": 608,
              "topicName": "Marketing Strategy"
            },
            {
              "id": 609,
              "topicName": "Marketing Automation"
            },
            {
              "id": 610,
              "topicName": "ActiveCampaign"
            }
          ]
        },
        {
          "id": 611,
          "subCategoriesName": "Public Relations",
          "topic": [
            {
              "id": 612,
              "topicName": "Media Traning"
            },
            {
              "id": 613,
              "topicName": "Business Communication"
            },
            {
              "id": 614,
              "topicName": "Public Speaking"
            },
            {
              "id": 615,
              "topicName": "Startup"
            },
            {
              "id": 616,
              "topicName": "Podcasting"
            },
            {
              "id": 617,
              "topicName": "Event Planning"
            },
            {
              "id": 618,
              "topicName": "Copywriting"
            },
            {
              "id": 619,
              "topicName": "LinkedIn"
            }
          ]
        },
        {
          "id": 620,
          "subCategoriesName": "Advertising",
          "topic": [
            {
              "id": 621,
              "topicName": "Google Ads (Adwords)"
            },
            {
              "id": 622,
              "topicName": "Facebook Ads"
            },
            {
              "id": 623,
              "topicName": "Mailchimp"
            },
            {
              "id": 624,
              "topicName": "Email Marketing"
            },
            {
              "id": 625,
              "topicName": "PPC Advertising"
            },
            {
              "id": 626,
              "topicName": "LinkedIn"
            },
            {
              "id": 627,
              "topicName": "Google Ads (Adwords) Certification"
            },
            {
              "id": 628,
              "topicName": "Facebook Marketing"
            },
            {
              "id": 629,
              "topicName": "YouTube Marketing"
            }
          ]
        },
        {
          "id": 630,
          "subCategoriesName": "Video & Mobile Marketing",
          "topic": [
            {
              "id": 631,
              "topicName": "YouTube Marketing"
            },
            {
              "id": 632,
              "topicName": "YouTube Audience Growth"
            },
            {
              "id": 633,
              "topicName": "Video Creation"
            },
            {
              "id": 634,
              "topicName": "PowerPoint"
            },
            {
              "id": 635,
              "topicName": "Video Marketing"
            },
            {
              "id": 636,
              "topicName": "Video Editing"
            },
            {
              "id": 637,
              "topicName": "Live Streaming"
            },
            {
              "id": 638,
              "topicName": "Whiteboard Animation"
            },
            {
              "id": 639,
              "topicName": "App Marketing"
            }
          ]
        },
        {
          "id": 640,
          "subCategoriesName": "Content Marketing",
          "topic": [
            {
              "id": 641,
              "topicName": "Copywriting"
            },
            {
              "id": 642,
              "topicName": "Blogging"
            },
            {
              "id": 643,
              "topicName": "Content Writing"
            },
            {
              "id": 644,
              "topicName": "Writing"
            },
            {
              "id": 645,
              "topicName": "Marketing Strategy"
            },
            {
              "id": 646,
              "topicName": "Freelancing"
            },
            {
              "id": 647,
              "topicName": "Content Creation"
            },
            {
              "id": 648,
              "topicName": "YouTube Audiance Growth"
            }
          ]
        },
        {
          "id": 649,
          "subCategoriesName": "Growth Hacking",
          "topic": [
            {
              "id": 650,
              "topicName": "Digital Marketing"
            },
            {
              "id": 651,
              "topicName": "Lead Generation"
            },
            {
              "id": 652,
              "topicName": "App Marketing"
            },
            {
              "id": 653,
              "topicName": "Marketing Strategy"
            },
            {
              "id": 654,
              "topicName": "Excel"
            },
            {
              "id": 655,
              "topicName": "SEO"
            },
            {
              "id": 656,
              "topicName": "Instagram Marketing"
            },
            {
              "id": 657,
              "topicName": "Local SEO"
            }
          ]
        },
        {
          "id": 658,
          "subCategoriesName": "Affiliate Marketing",
          "topic": [
            {
              "id": 659,
              "topicName": "ClickBank"
            },
            {
              "id": 660,
              "topicName": "Amazon Affiliate Marketing"
            },
            {
              "id": 661,
              "topicName": "SEO"
            },
            {
              "id": 662,
              "topicName": "CPA Marketing"
            },
            {
              "id": 663,
              "topicName": "Teespring"
            },
            {
              "id": 664,
              "topicName": "Marketing Strategy"
            },
            {
              "id": 665,
              "topicName": "Home Business"
            },
            {
              "id": 666,
              "topicName": "Network Marketing"
            }
          ]
        },
        {
          "id": 667,
          "subCategoriesName": "Product Marketing",
          "topic": [
            {
              "id": 668,
              "topicName": "Marketing Plan"
            },
            {
              "id": 669,
              "topicName": "Amazon Kindle"
            },
            {
              "id": 670,
              "topicName": "Self-Publishing"
            },
            {
              "id": 671,
              "topicName": "Product Management"
            },
            {
              "id": 672,
              "topicName": "Voice-Over"
            },
            {
              "id": 673,
              "topicName": "Presentation Skills"
            },
            {
              "id": 674,
              "topicName": "Marketing Management"
            },
            {
              "id": 675,
              "topicName": "Copywriting"
            },
            {
              "id": 676,
              "topicName": "Facebook Marketing"
            }
          ]
        },
        {
          "id": 677,
          "subCategoriesName": "Other Marketing",
          "topic": [
            {
              "id": 678,
              "topicName": "Copywriting"
            },
            {
              "id": 679,
              "topicName": "Google Ads (AdWords) Certification"
            },
            {
              "id": 680,
              "topicName": "YouTube Audience Growth"
            },
            {
              "id": 681,
              "topicName": "Conversion Rate Optimization"
            },
            {
              "id": 682,
              "topicName": "Instagram Marketing"
            },
            {
              "id": 683,
              "topicName": "Event Planning"
            },
            {
              "id": 684,
              "topicName": "Marketing Strategy"
            },
            {
              "id": 685,
              "topicName": "Social Media Marketing"
            },
            {
              "id": 686,
              "topicName": "Digital Marketing"
            }
          ]
        }
      ]
    },
    {
      "id": 687,
      "categoryName": "Music",
      "subcategories": [
        {
          "id": 688,
          "subCategoriesName": "Instruments",
          "topic": [
            {
              "id": 689,
              "topicName": "Piano"
            },
            {
              "id": 690,
              "topicName": "Guitar"
            },
            {
              "id": 691,
              "topicName": "Keyboard Instrument"
            },
            {
              "id": 692,
              "topicName": "Ukulele"
            },
            {
              "id": 693,
              "topicName": "Harmonica"
            },
            {
              "id": 694,
              "topicName": "Violin"
            },
            {
              "id": 695,
              "topicName": "Drums"
            },
            {
              "id": 696,
              "topicName": "Fingerstyle Guitar"
            },
            {
              "id": 697,
              "topicName": "Classical Guitar"
            }
          ]
        },
        {
          "id": 698,
          "subCategoriesName": "Music Production",
          "topic": [
            {
              "id": 699,
              "topicName": "Logic Pro X"
            },
            {
              "id": 700,
              "topicName": "Music Mixing"
            },
            {
              "id": 701,
              "topicName": "Ableton Live"
            },
            {
              "id": 702,
              "topicName": "Music Composition"
            },
            {
              "id": 703,
              "topicName": "Audio Production"
            },
            {
              "id": 704,
              "topicName": "FL Studio"
            },
            {
              "id": 705,
              "topicName": "Game Music"
            },
            {
              "id": 706,
              "topicName": "Sound Design"
            }
          ]
        },
        {
          "id": 707,
          "subCategoriesName": "Music Fundamentals",
          "topic": [
            {
              "id": 708,
              "topicName": "Music Theory"
            },
            {
              "id": 709,
              "topicName": "Music Composition"
            },
            {
              "id": 710,
              "topicName": "Electronic Music"
            },
            {
              "id": 711,
              "topicName": "Songwriting"
            },
            {
              "id": 712,
              "topicName": "Reading Music"
            },
            {
              "id": 713,
              "topicName": "Fingerstyle Guitar"
            },
            {
              "id": 714,
              "topicName": "Piano"
            },
            {
              "id": 715,
              "topicName": "ABRSM"
            },
            {
              "id": 716,
              "topicName": "Piano Chords"
            }
          ]
        },
        {
          "id": 717,
          "subCategoriesName": "Vocal",
          "topic": [
            {
              "id": 718,
              "topicName": "Singing"
            },
            {
              "id": 719,
              "topicName": "Voice Training"
            },
            {
              "id": 720,
              "topicName": "Voice Acting"
            },
            {
              "id": 721,
              "topicName": "Rapping"
            },
            {
              "id": 722,
              "topicName": "Music Production"
            },
            {
              "id": 723,
              "topicName": "Raga Music"
            },
            {
              "id": 724,
              "topicName": "Voice-Over"
            },
            {
              "id": 725,
              "topicName": "Yoga"
            },
            {
              "id": 726,
              "topicName": "Carnatic Music"
            }
          ]
        },
        {
          "id": 727,
          "subCategoriesName": "Music Techniques",
          "topic": [
            {
              "id": 728,
              "topicName": "Guitar"
            },
            {
              "id": 729,
              "topicName": "Music Composition"
            },
            {
              "id": 730,
              "topicName": "Acoustic Guitar"
            },
            {
              "id": 731,
              "topicName": "Fingerstyle Guitar"
            },
            {
              "id": 732,
              "topicName": "Reading Music"
            },
            {
              "id": 733,
              "topicName": "Piano"
            },
            {
              "id": 734,
              "topicName": "Music Theory"
            },
            {
              "id": 735,
              "topicName": "DJ"
            },
            {
              "id": 736,
              "topicName": "Harmony"
            }
          ]
        },
        {
          "id": 737,
          "subCategoriesName": "Music Software",
          "topic": [
            {
              "id": 738,
              "topicName": "FL Studio"
            },
            {
              "id": 739,
              "topicName": "Ableton Live"
            },
            {
              "id": 740,
              "topicName": "Logic Pro X"
            },
            {
              "id": 741,
              "topicName": "Music Production"
            },
            {
              "id": 742,
              "topicName": "Cubase"
            },
            {
              "id": 743,
              "topicName": "Pro Tools"
            },
            {
              "id": 744,
              "topicName": "GarageBand"
            },
            {
              "id": 745,
              "topicName": "DJ"
            },
            {
              "id": 746,
              "topicName": "Xfer Serum"
            }
          ]
        },
        {
          "id": 747,
          "subCategoriesName": "Other Music",
          "topic": [
            {
              "id": 748,
              "topicName": "DJ"
            },
            {
              "id": 749,
              "topicName": "Songwriting"
            },
            {
              "id": 750,
              "topicName": "Music Marketing"
            },
            {
              "id": 751,
              "topicName": "Music Business"
            },
            {
              "id": 752,
              "topicName": "Sound Therapy"
            },
            {
              "id": 753,
              "topicName": "Rapping"
            },
            {
              "id": 754,
              "topicName": "Luthiery"
            },
            {
              "id": 755,
              "topicName": "Talent Agent"
            },
            {
              "id": 756,
              "topicName": "Lyric Writing"
            }
          ]
        }
      ]
    },
    {
      "id": 757,
      "categoryName": "Photography & Video",
      "subcategories": [
        {
          "id": 758,
          "subCategoriesName": "Digital Photography",
          "topic": [
            {
              "id": 759,
              "topicName": "Photography"
            },
            {
              "id": 760,
              "topicName": "DSLR"
            },
            {
              "id": 761,
              "topicName": "Adobe Lightroom"
            },
            {
              "id": 762,
              "topicName": "Affinity Photo"
            },
            {
              "id": 763,
              "topicName": "Mobile Photography"
            },
            {
              "id": 764,
              "topicName": "Photoshop"
            },
            {
              "id": 765,
              "topicName": "GIMP"
            }
          ]
        },
        {
          "id": 766,
          "subCategoriesName": "Photography",
          "topic": [
            {
              "id": 767,
              "topicName": "Affinity Photo"
            },
            {
              "id": 768,
              "topicName": "Photography Composition"
            },
            {
              "id": 769,
              "topicName": "DSLR"
            },
            {
              "id": 770,
              "topicName": "Digital Photography"
            },
            {
              "id": 771,
              "topicName": "Photography Lighting"
            },
            {
              "id": 772,
              "topicName": "Cameras"
            },
            {
              "id": 773,
              "topicName": "Food Photography"
            },
            {
              "id": 774,
              "topicName": "Filmmaking"
            }
          ]
        },
        {
          "id": 775,
          "subCategoriesName": "Portrait Photography",
          "topic": [
            {
              "id": 776,
              "topicName": "Photoshop Retouching"
            },
            {
              "id": 777,
              "topicName": "Posing"
            },
            {
              "id": 778,
              "topicName": "Photography Lighting"
            },
            {
              "id": 779,
              "topicName": "Flash Photography"
            },
            {
              "id": 780,
              "topicName": "Family Portrait Photography"
            },
            {
              "id": 781,
              "topicName": "Photography"
            },
            {
              "id": 782,
              "topicName": "Photoshop"
            },
            {
              "id": 783,
              "topicName": "Cameras"
            }
          ]
        },
        {
          "id": 784,
          "subCategoriesName": "Photography Tools",
          "topic": [
            {
              "id": 785,
              "topicName": "Adobe Lightroom"
            },
            {
              "id": 786,
              "topicName": "Photoshop"
            },
            {
              "id": 787,
              "topicName": "Image Editing"
            },
            {
              "id": 788,
              "topicName": "Affinity Photo"
            },
            {
              "id": 789,
              "topicName": "Photoshop Retouching"
            },
            {
              "id": 790,
              "topicName": "Photography"
            },
            {
              "id": 791,
              "topicName": "Drone Photography"
            },
            {
              "id": 792,
              "topicName": "Cameras"
            },
            {
              "id": 793,
              "topicName": "DSLR"
            }
          ]
        },
        {
          "id": 794,
          "subCategoriesName": "Commercial Photography",
          "topic": [
            {
              "id": 795,
              "topicName": "Real Estate Photography"
            },
            {
              "id": 796,
              "topicName": "Marketing Strategy"
            },
            {
              "id": 797,
              "topicName": "Architecture Photography"
            },
            {
              "id": 798,
              "topicName": "Photography Business"
            },
            {
              "id": 799,
              "topicName": "Wedding Photograpgy"
            },
            {
              "id": 800,
              "topicName": "Product Photography"
            },
            {
              "id": 801,
              "topicName": "Food Photography"
            },
            {
              "id": 802,
              "topicName": "Photography"
            },
            {
              "id": 803,
              "topicName": "Photography Lighting"
            }
          ]
        },
        {
          "id": 804,
          "subCategoriesName": "Video Design",
          "topic": [
            {
              "id": 805,
              "topicName": "Video Editing"
            },
            {
              "id": 806,
              "topicName": "Adobe Premiere"
            },
            {
              "id": 807,
              "topicName": "Video Production"
            },
            {
              "id": 808,
              "topicName": "Filmmaking"
            },
            {
              "id": 809,
              "topicName": "DaVinci Resolve"
            },
            {
              "id": 810,
              "topicName": "Videography"
            },
            {
              "id": 811,
              "topicName": "Final Cut Pro"
            },
            {
              "id": 812,
              "topicName": "Cinematography"
            },
            {
              "id": 813,
              "topicName": "Color Grading"
            }
          ]
        },
        {
          "id": 814,
          "subCategoriesName": "Other Photography & Video",
          "topic": [
            {
              "id": 815,
              "topicName": "Photography"
            },
            {
              "id": 816,
              "topicName": "Drone Photography"
            },
            {
              "id": 817,
              "topicName": "Landscape Photography"
            },
            {
              "id": 818,
              "topicName": "Color Grading"
            },
            {
              "id": 819,
              "topicName": "Nature Photograpgy"
            },
            {
              "id": 820,
              "topicName": "3D Modelingh"
            },
            {
              "id": 821,
              "topicName": "Aerial Videography"
            },
            {
              "id": 822,
              "topicName": "Filmmaking"
            },
            {
              "id": 823,
              "topicName": "Cameras"
            }
          ]
        }
      ]
    },
    {
      "id": 824,
      "categoryName": "Finance & Accounting",
      "subcategories": [
        {
          "id": 825,
          "subCategoriesName": "Accounting & Bookkeeping",
          "topic": [
            {
              "id": 826,
              "topicName": "Accounting"
            },
            {
              "id": 827,
              "topicName": "Finance Fundmentals"
            },
            {
              "id": 828,
              "topicName": "Finanacial Accounting"
            },
            {
              "id": 829,
              "topicName": "Book keeping"
            },
            {
              "id": 830,
              "topicName": "Financial Statement"
            },
            {
              "id": 831,
              "topicName": "Xero"
            },
            {
              "id": 832,
              "topicName": "Tally ERP"
            },
            {
              "id": 833,
              "topicName": "SAP FICO"
            },
            {
              "id": 834,
              "topicName": "IFRS"
            }
          ]
        },
        {
          "id": 835,
          "subCategoriesName": "Compliance",
          "topic": [
            {
              "id": 836,
              "topicName": "Anti-Money Laundering"
            },
            {
              "id": 837,
              "topicName": "Risk Management"
            },
            {
              "id": 838,
              "topicName": "Sarbanes Oxley(SOX)"
            },
            {
              "id": 839,
              "topicName": "Internal Auditing"
            },
            {
              "id": 840,
              "topicName": "Certified Internal Auditor(CIA)"
            },
            {
              "id": 841,
              "topicName": "Cams Certification"
            },
            {
              "id": 842,
              "topicName": "IFRS"
            },
            {
              "id": 843,
              "topicName": "Fianancial Risk Manager(FRM) "
            },
            {
              "id": 844,
              "topicName": "Certified Fraud Examiner(CFE)"
            }
          ]
        },
        {
          "id": 845,
          "subCategoriesName": "Cryptocurrency & Blockchain",
          "topic": [
            {
              "id": 846,
              "topicName": "Cryptocurrency"
            },
            {
              "id": 847,
              "topicName": "Bitcoin"
            },
            {
              "id": 848,
              "topicName": "Blockchain"
            },
            {
              "id": 849,
              "topicName": "Personal Finance"
            },
            {
              "id": 850,
              "topicName": "Day Trading"
            },
            {
              "id": 851,
              "topicName": "Bitcoin Trading"
            },
            {
              "id": 852,
              "topicName": "Ethereum"
            },
            {
              "id": 853,
              "topicName": "Technical Analysis "
            }
          ]
        },
        {
          "id": 854,
          "subCategoriesName": "Economics",
          "topic": [
            {
              "id": 855,
              "topicName": "Microeconomics"
            },
            {
              "id": 856,
              "topicName": "Macroeconomics"
            },
            {
              "id": 857,
              "topicName": "Stata"
            },
            {
              "id": 858,
              "topicName": "Econometrics"
            },
            {
              "id": 859,
              "topicName": "Entrepreneurship Fundamentals"
            },
            {
              "id": 860,
              "topicName": "Political Science"
            },
            {
              "id": 861,
              "topicName": "Finance Fundamentals"
            },
            {
              "id": 862,
              "topicName": "Regression analysis "
            }
          ]
        },
        {
          "id": 863,
          "subCategoriesName": "Finance",
          "topic": [
            {
              "id": 864,
              "topicName": "Personal Finance"
            },
            {
              "id": 865,
              "topicName": "Investment Banking"
            },
            {
              "id": 866,
              "topicName": "CFA"
            },
            {
              "id": 867,
              "topicName": "Finance Fundamentals"
            },
            {
              "id": 868,
              "topicName": "Financial Management"
            },
            {
              "id": 869,
              "topicName": "Financial Analysis"
            },
            {
              "id": 870,
              "topicName": "Corporate Finance"
            },
            {
              "id": 871,
              "topicName": "Excel "
            },
            {
              "id": 872,
              "topicName": "Company Valuation "
            }
          ]
        },
        {
          "id": 873,
          "subCategoriesName": "Finance Cert & Exam Prep",
          "topic": [
            {
              "id": 874,
              "topicName": "CFA"
            },
            {
              "id": 875,
              "topicName": "Financial Markets"
            },
            {
              "id": 876,
              "topicName": "Quantitative Finance"
            },
            {
              "id": 877,
              "topicName": "Certified Management Accountant(CMA)"
            },
            {
              "id": 878,
              "topicName": "ACCA"
            },
            {
              "id": 879,
              "topicName": "Financial Management"
            },
            {
              "id": 880,
              "topicName": "ANBIMA Certification"
            },
            {
              "id": 881,
              "topicName": "Fixed Income Securities "
            },
            {
              "id": 882,
              "topicName": "Financial Planning"
            }
          ]
        },
        {
          "id": 883,
          "subCategoriesName": "Financial Moodeling & Analysis",
          "topic": [
            {
              "id": 884,
              "topicName": "Financial Analysis"
            },
            {
              "id": 885,
              "topicName": "Financial Moodeling "
            },
            {
              "id": 886,
              "topicName": "Finance Fundamentals"
            },
            {
              "id": 887,
              "topicName": "Excel"
            },
            {
              "id": 888,
              "topicName": "Accounting"
            },
            {
              "id": 889,
              "topicName": "Investing"
            },
            {
              "id": 890,
              "topicName": "Python"
            },
            {
              "id": 891,
              "topicName": "Investment Banking "
            },
            {
              "id": 892,
              "topicName": "Financial Management"
            }
          ]
        },
        {
          "id": 893,
          "subCategoriesName": "Investing & Trading",
          "topic": [
            {
              "id": 894,
              "topicName": "Stock Trading"
            },
            {
              "id": 895,
              "topicName": "Forex"
            },
            {
              "id": 896,
              "topicName": "Technical Analysis"
            },
            {
              "id": 897,
              "topicName": "Investing"
            },
            {
              "id": 898,
              "topicName": "Options Trading"
            },
            {
              "id": 899,
              "topicName": "Day Trading"
            },
            {
              "id": 900,
              "topicName": "Financial Analysis"
            },
            {
              "id": 901,
              "topicName": "Algorithmic Trading  "
            },
            {
              "id": 902,
              "topicName": "Financial Trading"
            }
          ]
        },
        {
          "id": 903,
          "subCategoriesName": "Money Management Tools ",
          "topic": [
            {
              "id": 904,
              "topicName": "QuickBooks Online"
            },
            {
              "id": 905,
              "topicName": "Excel"
            },
            {
              "id": 906,
              "topicName": "QuickBooks"
            },
            {
              "id": 907,
              "topicName": "QuickBooks Pro"
            },
            {
              "id": 908,
              "topicName": "Xero"
            },
            {
              "id": 909,
              "topicName": "Excel Analytics"
            },
            {
              "id": 910,
              "topicName": "Financial Modeling"
            },
            {
              "id": 911,
              "topicName": "Financial Analysis"
            }
          ]
        },
        {
          "id": 912,
          "subCategoriesName": "Taxes",
          "topic": [
            {
              "id": 913,
              "topicName": "Tax Preparation"
            },
            {
              "id": 914,
              "topicName": "Goods and Services Tax"
            },
            {
              "id": 915,
              "topicName": "Accounting"
            },
            {
              "id": 916,
              "topicName": "Value Added Tax(VAT)"
            },
            {
              "id": 917,
              "topicName": "QuickBooks Online"
            },
            {
              "id": 918,
              "topicName": "Personal Finance"
            },
            {
              "id": 919,
              "topicName": "Home Business"
            },
            {
              "id": 920,
              "topicName": "Financial Planning"
            },
            {
              "id": 921,
              "topicName": "Financial Accounting"
            }
          ]
        },
        {
          "id": 922,
          "subCategoriesName": "Other Finance & Accounting",
          "topic": [
            {
              "id": 923,
              "topicName": "Technical Analysis"
            },
            {
              "id": 924,
              "topicName": "PowerPoint"
            },
            {
              "id": 925,
              "topicName": "Financial Planning"
            },
            {
              "id": 926,
              "topicName": "Coaching"
            },
            {
              "id": 927,
              "topicName": "Investing"
            },
            {
              "id": 928,
              "topicName": "Passive Income"
            },
            {
              "id": 929,
              "topicName": "Fundraising"
            },
            {
              "id": 930,
              "topicName": "Negotiation"
            },
            {
              "id": 931,
              "topicName": "Finance Fundamentals"
            }
          ]
        }
      ]
    },
    {
      "id": 932,
      "categoryName": "IT & Software",
      "subcategories": [
        {
          "id": 933,
          "subCategoriesName": "IT Certification",
          "topic": [
            {
              "id": 934,
              "topicName": "AWS Certification"
            },
            {
              "id": 935,
              "topicName": "Microsoft Certification"
            },
            {
              "id": 936,
              "topicName": "AWS Certified Solution Architect-Associate"
            },
            {
              "id": 937,
              "topicName": "AWS Certified Cloud Practitioner"
            },
            {
              "id": 938,
              "topicName": "CompTIA A+"
            },
            {
              "id": 939,
              "topicName": "Cisco CCNA"
            },
            {
              "id": 940,
              "topicName": "Amazon AWS"
            },
            {
              "id": 941,
              "topicName": "AWS Certified Developer-Associate"
            },
            {
              "id": 942,
              "topicName": "CompTIA Security+"
            }
          ]
        },
        {
          "id": 943,
          "subCategoriesName": "Newtork & Security",
          "topic": [
            {
              "id": 944,
              "topicName": "Ethical hacking"
            },
            {
              "id": 945,
              "topicName": "Cyber Security"
            },
            {
              "id": 946,
              "topicName": "CompTIA Security+"
            },
            {
              "id": 947,
              "topicName": "Network Security"
            },
            {
              "id": 948,
              "topicName": "Penetration Testing"
            },
            {
              "id": 949,
              "topicName": "IT Networking Fundamentals"
            },
            {
              "id": 950,
              "topicName": "CompTIA Network+"
            },
            {
              "id": 951,
              "topicName": "Cisco CCNA "
            },
            {
              "id": 952,
              "topicName": "Terraform"
            }
          ]
        },
        {
          "id": 953,
          "subCategoriesName": "Hardware",
          "topic": [
            {
              "id": 954,
              "topicName": "Arduino"
            },
            {
              "id": 955,
              "topicName": "PLC"
            },
            {
              "id": 956,
              "topicName": "Electronics"
            },
            {
              "id": 957,
              "topicName": "Microcontroller"
            },
            {
              "id": 958,
              "topicName": "Raspberry Pi"
            },
            {
              "id": 959,
              "topicName": "Embedded Systems"
            },
            {
              "id": 960,
              "topicName": "FPGA"
            },
            {
              "id": 961,
              "topicName": "HMI "
            },
            {
              "id": 962,
              "topicName": "Embedded C "
            }
          ]
        },
        {
          "id": 963,
          "subCategoriesName": "Operatinng Systems",
          "topic": [
            {
              "id": 964,
              "topicName": "Linux"
            },
            {
              "id": 965,
              "topicName": "Linux Administration"
            },
            {
              "id": 966,
              "topicName": "Windows Server"
            },
            {
              "id": 967,
              "topicName": "Shell Scripting"
            },
            {
              "id": 968,
              "topicName": "Active Directory"
            },
            {
              "id": 969,
              "topicName": "PowerShell"
            },
            {
              "id": 970,
              "topicName": "VMware VSphere"
            },
            {
              "id": 971,
              "topicName": "LPIC-1:Linux Administrator"
            },
            {
              "id": 972,
              "topicName": "Operating System Creation"
            }
          ]
        },
        {
          "id": 973,
          "subCategoriesName": "Other IT & Software",
          "topic": [
            {
              "id": 974,
              "topicName": "Docker"
            },
            {
              "id": 975,
              "topicName": "Python"
            },
            {
              "id": 976,
              "topicName": "Kubernetes"
            },
            {
              "id": 977,
              "topicName": "DevOps"
            },
            {
              "id": 978,
              "topicName": "Algorithms"
            },
            {
              "id": 979,
              "topicName": "AWS Certified Solutions Architect-Professional"
            },
            {
              "id": 980,
              "topicName": "Ansible"
            },
            {
              "id": 981,
              "topicName": "AWS Certification "
            },
            {
              "id": 982,
              "topicName": "Java"
            }
          ]
        }
      ]
    },
    {
      "id": 983,
      "categoryName": "Office Productivity",
      "subcategories": [
        {
          "id": 984,
          "subCategoriesName": "Microsoft",
          "topic": [
            {
              "id": 985,
              "topicName": "Excel"
            },
            {
              "id": 986,
              "topicName": "Excel VBA"
            },
            {
              "id": 987,
              "topicName": "Excel Formulas and Functions"
            },
            {
              "id": 988,
              "topicName": "PowerPoint"
            },
            {
              "id": 989,
              "topicName": "Data Analysis"
            },
            {
              "id": 990,
              "topicName": "Microsoft Power BI"
            },
            {
              "id": 991,
              "topicName": "Pivot Tables"
            },
            {
              "id": 992,
              "topicName": "Microsoft Office"
            },
            {
              "id": 993,
              "topicName": "Microsoft Word"
            }
          ]
        },
        {
          "id": 994,
          "subCategoriesName": "Apple",
          "topic": [
            {
              "id": 995,
              "topicName": "iMovie"
            },
            {
              "id": 996,
              "topicName": "Mac Basics"
            },
            {
              "id": 997,
              "topicName": "macOS"
            },
            {
              "id": 998,
              "topicName": "Apple Keynote"
            },
            {
              "id": 999,
              "topicName": "Numbers For Mac"
            },
            {
              "id": 1000,
              "topicName": "Mac Pages"
            },
            {
              "id": 1001,
              "topicName": "Office Productivity"
            },
            {
              "id": 1002,
              "topicName": "Microsoft Word "
            },
            {
              "id": 1003,
              "topicName": "Microsoft Office 365"
            }
          ]
        },
        {
          "id": 1004,
          "subCategoriesName": "Google",
          "topic": [
            {
              "id": 1005,
              "topicName": "Google Sheets"
            },
            {
              "id": 1006,
              "topicName": "Google Workspace (G Suite)"
            },
            {
              "id": 1007,
              "topicName": "Google Drive"
            },
            {
              "id": 1008,
              "topicName": "Google Apps"
            },
            {
              "id": 1009,
              "topicName": "Gmail Productivity"
            },
            {
              "id": 1010,
              "topicName": "Excel"
            },
            {
              "id": 1011,
              "topicName": "Google Classroom"
            },
            {
              "id": 1012,
              "topicName": "Google Data Studio "
            },
            {
              "id": 1013,
              "topicName": "Google Docs "
            }
          ]
        },
        {
          "id": 1014,
          "subCategoriesName": "SAP",
          "topic": [
            {
              "id": 1015,
              "topicName": "SAP ABAP"
            },
            {
              "id": 1016,
              "topicName": "SAP MM"
            },
            {
              "id": 1017,
              "topicName": "SAP S/4HANA"
            },
            {
              "id": 1018,
              "topicName": "SAP SD"
            },
            {
              "id": 1019,
              "topicName": "SAP Financial Accounting"
            },
            {
              "id": 1020,
              "topicName": "SAP HCM"
            },
            {
              "id": 1021,
              "topicName": "SAP Basis"
            },
            {
              "id": 1022,
              "topicName": "Supply Chain"
            }
          ]
        },
        {
          "id": 1023,
          "subCategoriesName": "Oracle",
          "topic": [
            {
              "id": 1024,
              "topicName": "Oracle Database"
            },
            {
              "id": 1025,
              "topicName": "Oracle SQL"
            },
            {
              "id": 1026,
              "topicName": "PI/SQL"
            },
            {
              "id": 1027,
              "topicName": "Darabase Administration"
            },
            {
              "id": 1028,
              "topicName": "Oracle Primavera"
            },
            {
              "id": 1029,
              "topicName": "SQL"
            },
            {
              "id": 1030,
              "topicName": "Oracle Fusion HCM"
            },
            {
              "id": 1031,
              "topicName": "Oracle Business Intelligence "
            },
            {
              "id": 1032,
              "topicName": "Oracle Data Integrator"
            }
          ]
        },
        {
          "id": 1033,
          "subCategoriesName": "Other Office Productivity",
          "topic": [
            {
              "id": 1034,
              "topicName": "ServiceNow"
            },
            {
              "id": 1035,
              "topicName": "QuickBooks Pro"
            },
            {
              "id": 1036,
              "topicName": "Touch Typing"
            },
            {
              "id": 1037,
              "topicName": "Construction Estimation"
            },
            {
              "id": 1038,
              "topicName": "QuickBooks"
            },
            {
              "id": 1039,
              "topicName": "Salesforce"
            },
            {
              "id": 1040,
              "topicName": "AutoCAD"
            },
            {
              "id": 1041,
              "topicName": "Time Management"
            },
            {
              "id": 1042,
              "topicName": "Personal Productivity"
            }
          ]
        }
      ]
    },
    {
      "id": 1043,
      "categoryName": "Personal Development",
      "subcategories": [
        {
          "id": 1044,
          "subCategoriesName": "Personal Transformation",
          "topic": [
            {
              "id": 1045,
              "topicName": "Life Coach Training"
            },
            {
              "id": 1046,
              "topicName": "Neuro-Linguistic Programming"
            },
            {
              "id": 1047,
              "topicName": "Mindfulness"
            },
            {
              "id": 1048,
              "topicName": "Personal Development"
            },
            {
              "id": 1049,
              "topicName": "Life Purpose"
            },
            {
              "id": 1050,
              "topicName": "NeuroScience"
            },
            {
              "id": 1051,
              "topicName": "Meditation"
            },
            {
              "id": 1052,
              "topicName": "Emotional Intelligence"
            }
          ]
        },
        {
          "id": 1053,
          "subCategoriesName": "Personal Productivity",
          "topic": [
            {
              "id": 1054,
              "topicName": "Time Management"
            },
            {
              "id": 1055,
              "topicName": "Focus Mastery"
            },
            {
              "id": 1056,
              "topicName": "Speed Reading"
            },
            {
              "id": 1057,
              "topicName": "Goal Setting"
            },
            {
              "id": 1058,
              "topicName": "Organization"
            },
            {
              "id": 1059,
              "topicName": "PowerShell"
            },
            {
              "id": 1060,
              "topicName": "Procrastination"
            },
            {
              "id": 1061,
              "topicName": "Habits "
            }
          ]
        },
        {
          "id": 1062,
          "subCategoriesName": "Leadership",
          "topic": [
            {
              "id": 1063,
              "topicName": "Management Skills"
            },
            {
              "id": 1064,
              "topicName": "Manager Training"
            },
            {
              "id": 1065,
              "topicName": "Communication Skills"
            },
            {
              "id": 1066,
              "topicName": "Public Speaking"
            },
            {
              "id": 1067,
              "topicName": "Listening Skills"
            },
            {
              "id": 1068,
              "topicName": "Conflict Management"
            },
            {
              "id": 1069,
              "topicName": "Spirituality"
            },
            {
              "id": 1070,
              "topicName": "Emotional Intelligence "
            }
          ]
        },
        {
          "id": 1071,
          "subCategoriesName": "Career Development",
          "topic": [
            {
              "id": 1072,
              "topicName": "Resume and CV Writing"
            },
            {
              "id": 1073,
              "topicName": "Interviewing Skills"
            },
            {
              "id": 1074,
              "topicName": "Job Search"
            },
            {
              "id": 1075,
              "topicName": "LinkedIn"
            },
            {
              "id": 1076,
              "topicName": "Personal Networking"
            },
            {
              "id": 1077,
              "topicName": "Life Coach Training"
            },
            {
              "id": 1078,
              "topicName": "Career Coaching"
            },
            {
              "id": 1079,
              "topicName": "Business Communication"
            },
            {
              "id": 1080,
              "topicName": "Business Writing"
            }
          ]
        },
        {
          "id": 1081,
          "subCategoriesName": "Parenting & Relationships",
          "topic": [
            {
              "id": 1082,
              "topicName": "Parenting"
            },
            {
              "id": 1083,
              "topicName": "Neuroscience"
            },
            {
              "id": 1084,
              "topicName": "Relationship Building"
            },
            {
              "id": 1085,
              "topicName": "Child Psychology"
            },
            {
              "id": 1086,
              "topicName": "Counseling"
            },
            {
              "id": 1087,
              "topicName": "Early Childhood Education"
            },
            {
              "id": 1088,
              "topicName": "Love"
            },
            {
              "id": 1089,
              "topicName": "Life Coach Trianing"
            },
            {
              "id": 1090,
              "topicName": "Childhood Trauma and Healing"
            }
          ]
        },
        {
          "id": 1091,
          "subCategoriesName": "Happiness",
          "topic": [
            {
              "id": 1092,
              "topicName": "Life Coach Trianing"
            },
            {
              "id": 1093,
              "topicName": "Positive Psychology"
            },
            {
              "id": 1094,
              "topicName": "CBT"
            },
            {
              "id": 1095,
              "topicName": "Childhood Trauma Healing"
            },
            {
              "id": 1096,
              "topicName": "Law of Attraction"
            },
            {
              "id": 1097,
              "topicName": "Mindfulness"
            },
            {
              "id": 1098,
              "topicName": "Meditation"
            },
            {
              "id": 1099,
              "topicName": "Decluttering"
            }
          ]
        },
        {
          "id": 1100,
          "subCategoriesName": "Reiki",
          "topic": [
            {
              "id": 1101,
              "topicName": "Energy Healing"
            },
            {
              "id": 1102,
              "topicName": "Tarot reading"
            },
            {
              "id": 1103,
              "topicName": "Psychic"
            },
            {
              "id": 1104,
              "topicName": "Hypnotherapy"
            },
            {
              "id": 1105,
              "topicName": "Crystal Energy"
            },
            {
              "id": 1106,
              "topicName": "Chakra"
            },
            {
              "id": 1107,
              "topicName": "Shamanism"
            },
            {
              "id": 1108,
              "topicName": "Spirituality"
            }
          ]
        },
        {
          "id": 1109,
          "subCategoriesName": "Religion &Spirituality",
          "topic": [
            {
              "id": 1110,
              "topicName": "Mindfulness"
            },
            {
              "id": 1111,
              "topicName": "Spirituality"
            },
            {
              "id": 1112,
              "topicName": "Life Coach Training"
            },
            {
              "id": 1113,
              "topicName": "The Bible"
            },
            {
              "id": 1114,
              "topicName": "Spiritual Healing"
            },
            {
              "id": 1115,
              "topicName": "Meditation"
            },
            {
              "id": 1116,
              "topicName": "Numerology"
            },
            {
              "id": 1117,
              "topicName": "Personal Development"
            },
            {
              "id": 1118,
              "topicName": "Christianity"
            }
          ]
        },
        {
          "id": 1119,
          "subCategoriesName": "Personal Brand Building",
          "topic": [
            {
              "id": 1120,
              "topicName": "Personal Branding"
            },
            {
              "id": 1121,
              "topicName": "Business Communication"
            },
            {
              "id": 1122,
              "topicName": "Meetings"
            },
            {
              "id": 1123,
              "topicName": "Body Language"
            },
            {
              "id": 1124,
              "topicName": "Interviewing Skills"
            },
            {
              "id": 1125,
              "topicName": "LinkedIn"
            },
            {
              "id": 1126,
              "topicName": "Civil engineering"
            },
            {
              "id": 1127,
              "topicName": "Communication Skills"
            },
            {
              "id": 1128,
              "topicName": "Digital Marketing"
            }
          ]
        },
        {
          "id": 1129,
          "subCategoriesName": "Creativity",
          "topic": [
            {
              "id": 1130,
              "topicName": "Creative Writing"
            },
            {
              "id": 1131,
              "topicName": "Screen Writing"
            },
            {
              "id": 1132,
              "topicName": "Art Therapy"
            },
            {
              "id": 1133,
              "topicName": "Writing"
            },
            {
              "id": 1134,
              "topicName": "Design Thinking"
            },
            {
              "id": 1135,
              "topicName": "Writing a Book"
            },
            {
              "id": 1136,
              "topicName": "Story Telling"
            },
            {
              "id": 1137,
              "topicName": "Aromatherapy"
            },
            {
              "id": 1138,
              "topicName": "Drawing"
            }
          ]
        },
        {
          "id": 1139,
          "subCategoriesName": "Influence",
          "topic": [
            {
              "id": 1140,
              "topicName": "Voice Training"
            },
            {
              "id": 1141,
              "topicName": "Confidence"
            },
            {
              "id": 1142,
              "topicName": "Communication Skills"
            },
            {
              "id": 1143,
              "topicName": "Body Language"
            },
            {
              "id": 1144,
              "topicName": "Public Speaking"
            },
            {
              "id": 1145,
              "topicName": "Negotiation"
            },
            {
              "id": 1146,
              "topicName": "Persuasion"
            },
            {
              "id": 1147,
              "topicName": "Entrepreneurship Fundamentals"
            },
            {
              "id": 1148,
              "topicName": "Personal Development"
            }
          ]
        },
        {
          "id": 1149,
          "subCategoriesName": "Self Esteem & Confidence",
          "topic": [
            {
              "id": 1150,
              "topicName": "Confidence"
            },
            {
              "id": 1151,
              "topicName": "Self Esteem"
            },
            {
              "id": 1152,
              "topicName": "Neuro-Linguistic Programming"
            },
            {
              "id": 1153,
              "topicName": "Social Skills"
            },
            {
              "id": 1154,
              "topicName": "Fashion"
            },
            {
              "id": 1155,
              "topicName": "Art for Kids"
            },
            {
              "id": 1156,
              "topicName": "Drawing"
            },
            {
              "id": 1157,
              "topicName": "Anxiety Management"
            },
            {
              "id": 1158,
              "topicName": "Personal Development"
            }
          ]
        },
        {
          "id": 1159,
          "subCategoriesName": "Stress Management",
          "topic": [
            {
              "id": 1160,
              "topicName": "Anger Management"
            },
            {
              "id": 1161,
              "topicName": "Emotional Intelligence"
            },
            {
              "id": 1162,
              "topicName": "Anxiety Management"
            },
            {
              "id": 1163,
              "topicName": "Resilence"
            },
            {
              "id": 1164,
              "topicName": "Mindfulness"
            },
            {
              "id": 1165,
              "topicName": "EFT"
            },
            {
              "id": 1166,
              "topicName": "Meditation"
            },
            {
              "id": 1167,
              "topicName": "Conflict Management"
            }
          ]
        },
        {
          "id": 1168,
          "subCategoriesName": "Memory & Study Skills",
          "topic": [
            {
              "id": 1169,
              "topicName": "Memory"
            },
            {
              "id": 1170,
              "topicName": "Speed Reading"
            },
            {
              "id": 1171,
              "topicName": "Learning Strategies"
            },
            {
              "id": 1172,
              "topicName": "Study Skills"
            },
            {
              "id": 1173,
              "topicName": "Focus Mastery"
            },
            {
              "id": 1174,
              "topicName": "Mind Mapping"
            },
            {
              "id": 1175,
              "topicName": "Learning Disability"
            },
            {
              "id": 1176,
              "topicName": "Personal Development"
            },
            {
              "id": 1177,
              "topicName": "Optimization Problem"
            }
          ]
        },
        {
          "id": 1178,
          "subCategoriesName": "Motivation",
          "topic": [
            {
              "id": 1179,
              "topicName": "Neuroplasticity"
            },
            {
              "id": 1180,
              "topicName": "Procrstination"
            },
            {
              "id": 1181,
              "topicName": "Personal Success"
            },
            {
              "id": 1182,
              "topicName": "Confidence"
            },
            {
              "id": 1183,
              "topicName": "NeuroScience"
            },
            {
              "id": 1184,
              "topicName": "Habits"
            },
            {
              "id": 1185,
              "topicName": "Goal Setting"
            },
            {
              "id": 1186,
              "topicName": "Self-Discipline"
            }
          ]
        },
        {
          "id": 1187,
          "subCategoriesName": "Other Personal Development",
          "topic": [
            {
              "id": 1188,
              "topicName": "Freight Broker"
            },
            {
              "id": 1189,
              "topicName": "American Accent"
            },
            {
              "id": 1190,
              "topicName": "English Pronunciation"
            },
            {
              "id": 1191,
              "topicName": "Car Repair"
            },
            {
              "id": 1192,
              "topicName": "Public Speaking"
            },
            {
              "id": 1193,
              "topicName": "Handwriting Analysis"
            },
            {
              "id": 1194,
              "topicName": "Time Management"
            },
            {
              "id": 1195,
              "topicName": "Presentation Skills"
            },
            {
              "id": 1196,
              "topicName": "Contract Law"
            }
          ]
        }
      ]
    },
    {
      "id": 1197,
      "categoryName": "Teaching & Academics",
      "subcategories": [
        {
          "id": 1198,
          "subCategoriesName": "Engineering",
          "topic": [
            {
              "id": 1199,
              "topicName": "Data Structures"
            },
            {
              "id": 1200,
              "topicName": "Algorithms"
            },
            {
              "id": 1201,
              "topicName": "Electrical Engineering"
            },
            {
              "id": 1202,
              "topicName": "Electronics"
            },
            {
              "id": 1203,
              "topicName": "Civil engineering"
            },
            {
              "id": 1204,
              "topicName": "Robotics"
            },
            {
              "id": 1205,
              "topicName": "Structural Engineering"
            },
            {
              "id": 1206,
              "topicName": "Mechanical Engineering"
            },
            {
              "id": 1207,
              "topicName": "Aerospace Engineering"
            }
          ]
        },
        {
          "id": 1208,
          "subCategoriesName": "Humanities",
          "topic": [
            {
              "id": 1209,
              "topicName": "Christianity"
            },
            {
              "id": 1210,
              "topicName": "The Bible"
            },
            {
              "id": 1211,
              "topicName": "English Literature"
            },
            {
              "id": 1212,
              "topicName": "Psychology"
            },
            {
              "id": 1213,
              "topicName": "Creative Writing"
            },
            {
              "id": 1214,
              "topicName": "Art History"
            },
            {
              "id": 1215,
              "topicName": "Philosophy"
            },
            {
              "id": 1216,
              "topicName": "Critical Thinking "
            },
            {
              "id": 1217,
              "topicName": "Statistics"
            }
          ]
        },
        {
          "id": 1218,
          "subCategoriesName": "Math",
          "topic": [
            {
              "id": 1219,
              "topicName": "Calculus"
            },
            {
              "id": 1220,
              "topicName": "Statistics"
            },
            {
              "id": 1221,
              "topicName": "Algebra"
            },
            {
              "id": 1222,
              "topicName": "Linear Algebra"
            },
            {
              "id": 1223,
              "topicName": "Probability"
            },
            {
              "id": 1224,
              "topicName": "Trigonometry"
            },
            {
              "id": 1225,
              "topicName": "Discrete Math"
            },
            {
              "id": 1226,
              "topicName": "Geometry"
            }
          ]
        },
        {
          "id": 1227,
          "subCategoriesName": "Science",
          "topic": [
            {
              "id": 1228,
              "topicName": "Physics"
            },
            {
              "id": 1229,
              "topicName": "Solar Energy"
            },
            {
              "id": 1230,
              "topicName": "Chemistry"
            },
            {
              "id": 1231,
              "topicName": "Biology"
            },
            {
              "id": 1232,
              "topicName": "Anatomy"
            },
            {
              "id": 1233,
              "topicName": "Radio Frequency"
            },
            {
              "id": 1234,
              "topicName": "Neuroscience"
            },
            {
              "id": 1235,
              "topicName": "Physiology"
            },
            {
              "id": 1236,
              "topicName": "Research Paper Writing"
            }
          ]
        },
        {
          "id": 1237,
          "subCategoriesName": "Online Education",
          "topic": [
            {
              "id": 1238,
              "topicName": "Online Course Creation"
            },
            {
              "id": 1239,
              "topicName": "Teaching Online"
            },
            {
              "id": 1240,
              "topicName": "Online Course Marketing"
            },
            {
              "id": 1241,
              "topicName": "Teaching English"
            },
            {
              "id": 1242,
              "topicName": "Freelancing"
            },
            {
              "id": 1243,
              "topicName": "Math"
            },
            {
              "id": 1244,
              "topicName": "Online Business"
            },
            {
              "id": 1245,
              "topicName": "Articulate Storyline "
            },
            {
              "id": 1246,
              "topicName": "Mortgage"
            }
          ]
        },
        {
          "id": 1247,
          "subCategoriesName": "Social Science",
          "topic": [
            {
              "id": 1248,
              "topicName": "Psychology"
            },
            {
              "id": 1249,
              "topicName": "Counseling"
            },
            {
              "id": 1250,
              "topicName": "Accounting"
            },
            {
              "id": 1251,
              "topicName": "Psychotherapy"
            },
            {
              "id": 1252,
              "topicName": "Critical Thinking"
            },
            {
              "id": 1253,
              "topicName": "Dialectical Behaviour Therapy(DBT)"
            },
            {
              "id": 1254,
              "topicName": "Child Psychology"
            },
            {
              "id": 1255,
              "topicName": "Social Psychology "
            },
            {
              "id": 1256,
              "topicName": "Economics"
            }
          ]
        },
        {
          "id": 1257,
          "subCategoriesName": "Language",
          "topic": [
            {
              "id": 1258,
              "topicName": "English Language"
            },
            {
              "id": 1259,
              "topicName": "German Language"
            },
            {
              "id": 1260,
              "topicName": "Spanish Language"
            },
            {
              "id": 1261,
              "topicName": "Japanese Language"
            },
            {
              "id": 1262,
              "topicName": "English Grammar"
            },
            {
              "id": 1263,
              "topicName": "French Language"
            },
            {
              "id": 1264,
              "topicName": "English Converstion"
            },
            {
              "id": 1265,
              "topicName": "Sign Language "
            },
            {
              "id": 1266,
              "topicName": "English Vocabulary"
            }
          ]
        },
        {
          "id": 1267,
          "subCategoriesName": "Teacher Training",
          "topic": [
            {
              "id": 1268,
              "topicName": "Train the Trainer"
            },
            {
              "id": 1269,
              "topicName": "Instructional Design"
            },
            {
              "id": 1270,
              "topicName": "Early Childhood Education"
            },
            {
              "id": 1271,
              "topicName": "Teaching Online"
            },
            {
              "id": 1272,
              "topicName": "Teaching English"
            },
            {
              "id": 1273,
              "topicName": "Voice-Over"
            },
            {
              "id": 1274,
              "topicName": "Moodle"
            },
            {
              "id": 1275,
              "topicName": "ESL "
            }
          ]
        },
        {
          "id": 1276,
          "subCategoriesName": "Test Prep",
          "topic": [
            {
              "id": 1277,
              "topicName": "IELTS"
            },
            {
              "id": 1278,
              "topicName": "PMP"
            },
            {
              "id": 1279,
              "topicName": "TOEFL"
            },
            {
              "id": 1280,
              "topicName": "PMBOK"
            },
            {
              "id": 1281,
              "topicName": "Math"
            },
            {
              "id": 1282,
              "topicName": "Risk Management"
            },
            {
              "id": 1283,
              "topicName": "GMAT"
            },
            {
              "id": 1284,
              "topicName": "PMI-RMP "
            },
            {
              "id": 1285,
              "topicName": "BookKeeping"
            }
          ]
        },
        {
          "id": 1286,
          "subCategoriesName": "Other Teaching & Academics",
          "topic": [
            {
              "id": 1287,
              "topicName": "Proofreading"
            },
            {
              "id": 1288,
              "topicName": "Research Methods"
            },
            {
              "id": 1289,
              "topicName": "Data Analysis"
            },
            {
              "id": 1290,
              "topicName": "Academic writing"
            },
            {
              "id": 1291,
              "topicName": "Early Childhood Education"
            },
            {
              "id": 1292,
              "topicName": "Montessori"
            },
            {
              "id": 1293,
              "topicName": "Drawing"
            },
            {
              "id": 1294,
              "topicName": "Punctuation"
            },
            {
              "id": 1295,
              "topicName": "Fiction Writing"
            }
          ]
        }
      ]
    }
  ]


  constructor(
    private formBuilder: FormBuilder,
    private Authservice: AuthService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private studentservice: StudentService,
    private rout: ActivatedRoute,
    private category_service: CategoriesService,
    private differs: KeyValueDiffers,
    private _eref: ElementRef,
    private ObservableSer: ObservableService,
    private router: Router, private toastr: ToastrService) {

    var token = sessionStorage.getItem('token');

    if (token == null || token == '' || token == undefined) {
      sessionStorage.setItem('uid', '0');

      sessionStorage.setItem('ocademy_role', 'guest ');

    }

    this.subscription = this.ObservableSer.getMessage().subscribe(message => {
      if (message) {
        if (message.text == 'openloginModal') {
          this.openLoginModal();
        } else {

        }
        this.messages.push(message);
      } else {
        // clear messages when empty message received
        this.messages = [];
      }
    });



    this.subscription = this.ObservableSer.getPageNameService().subscribe(data => {
      this.loadafterloggedPage = data.pagename;
    });

    fromEvent(document, 'click').subscribe((dt) => {
      this.searchDivBox = false;
    });

    this.getWishListMethod();
  }


  opencategory(){
    this.category = !this.category;
  }

  loginForm: FormGroup;
  loading = false;
  forgotpasswordForm: FormGroup;
  returnUrl: string;
  signUpForm: FormGroup;
  submitted = false;
  signupsubmitted = false;
  forgotsubmitted = false;


  checkIsloogedIn: boolean;

  gettoken: any;

  showTab: boolean;

  hideTab: boolean
  searchheading: any;

  resetForm() {
    this.signUpForm.reset();
    this.loginForm.reset();
    this.forgotpasswordForm.reset();
    this.signupsubmitted = false;
    this.submitted = false;
    this.showerrorsigupDiv = false;
    this.userNameAlreadytakerror = '';
  }


  myControl = new FormControl();
  options: any[] = [];
  filteredOptions: Observable<any[]>;

  private _filter(value: any): any[] {
    var avoidspaces = value.split(' ').filter(n => n).join(' ');
    if (avoidspaces == '') {
      return;
    }
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges
      .pipe(startWith(),
        map(value => this._filter(value))
      );
    this.checkIsloogedIn = this.Authservice.isloggedIn();
    this.getAllData();
    this.gettingCatName();
    this.getCartLengthMethod();
    // this.getWishListMethod();
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required,
      Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20),
      Validators.pattern("^([-a-zA-Z]+)+[^]+[-a-zA-Z\s]*$")])]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      role: [''],
      password: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,15}') , Validators.maxLength(16)]],
    });


    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      // username: ['', [Validators.required,
      //   Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9]*$")])]],
      password: ['', [Validators.required, Validators.compose([Validators.required])]]
    });


    this.forgotpasswordForm = this.formBuilder.group({
      forgotpasswordemail: ['', [Validators.required, Validators.email]]
    });



    this.gettoken = sessionStorage.getItem('token');



    this.testLoginUser = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);

    this.loggedemailAddress = sessionStorage.getItem('eId');
    if (this.gettoken == null || this.gettoken == '' || this.gettoken == undefined) {
      this.showTab = this.checkIsloogedIn;
      this.hideTab = !this.checkIsloogedIn;
      // var uid  = 0;
      sessionStorage.setItem('uid', '0');
    } else {
      this.showTab = this.checkIsloogedIn;
      this.hideTab = !this.checkIsloogedIn;
      // sessionStorage.removeItem('openloginModal');
    }

    var openloginmodalDiv = sessionStorage.getItem('openloginModal');


    // if(openloginmodalDiv == 'loginModal' ){
    //   this.openLoginModal(); 
    // }



  }


  openLoginModal() {
    $('#exampleModal').modal('show');
  }


  get f() { return this.loginForm.controls; }

  get s() { return this.signUpForm.controls; }

  get fp() { return this.forgotpasswordForm.controls; }

  USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";


  userNameAlreadytakerror: any;
  showerrorsigupDiv: any = false;

  disablesignup = false;


  onSiginUpSubmit() {
    this.signupsubmitted = true;

    if (this.signUpForm.invalid) {
      //  this.toastr.warning('Please Enter Valid Details');
      return;
    } else {
      if (this.signUpForm.valid) {

        // if (!this.valid_username(this.signUpForm.value['username'])) {
        //   this.toastr.warning('Please Enter Valid UserName');
        // } else if (!this.valid_email(this.signUpForm.value['email'])) {
        //   this.toastr.warning('Please Enter Valid email id');
        // } else if (!this.valid_password(this.signUpForm.value['password'])) {
        //   this.toastr.warning('Please Enter Valid password'); 
        // } else {
        this.signUp = {
          username: this.signUpForm.value['username'],
          email: this.signUpForm.value['email'],
          password: (this.signUpForm.value['password']).replace(/^\s+/g, ''),
          role: ["student"]
        }
        this.spinner.show();

        this.Authservice.siginUp(this.signUp).subscribe((response: any) => {
          var verificationEmailAddres = this.signUpForm.value['email'];
          // this.toastr.success(response['message'], '', { timeOut: 1000 });        
          this.verificationMailMethod(verificationEmailAddres);
          sessionStorage.removeItem("loginModal");
          // setTimeout(() => { this.spinner.hide(); }, 1000);
          this.signupclose();
          var signUpmessage = response;
        },
          (error) => {
            this.showerrorsigupDiv = true;
            setTimeout(() => { this.spinner.hide(); }, 1000);
            if (error.status == 500) {
              this.userNameAlreadytakerror = error.error.message;
            } else if (error.status == 400) {
              this.userNameAlreadytakerror = error.error.message;
            } else if (error.status === 401) {
              this.toastr.warning("Please Access with valid Token", '', { timeOut: 1000 });
              this.Authservice.invalidtokenAccress();
            } else if (error.status == 409) {
              this.userNameAlreadytakerror = error.error.message;
            } else if (error.status == 404) {
              this.userNameAlreadytakerror = error.error.message;
            }
            else if (error.status === 409) {
              this.userNameAlreadytakerror = error.error.message;
            }
            else if (error.status === 406) {
              this.userNameAlreadytakerror = error.error.message;
            }  else if (error.status === 502) {
              this.userNameAlreadytakerror = "Our site is under maintainance, Please wait for some time and retry again....!";
            }
            else if (error.status === 504) {
              this.userNameAlreadytakerror = "Our site is under maintainance, Please wait for some time and retry again....!";
            }

          });




        // }
      }


      // this.signUp = {
      //   username: this.signUpForm.value['username'],
      //   email: this.signUpForm.value['email'],
      //   password: this.signUpForm.value['password'],
      //   role: ["student"]
      // }
    }

  }



  verificationMailMethod(verificationEmailAddres){
    this.spinner.show();
    this.Authservice.getemailverificationService(verificationEmailAddres).subscribe((response) => {
      // this.toastr.success(response['message'], '', { timeOut: 3000 });
      this.toastr.success(response['message']);

      setTimeout(() => { this.spinner.hide(); }, 100);
    }, (error) => {
      setTimeout(() => { this.spinner.hide(); }, 100);
      if (error.status == 500) {
        this.toastr.error('please provide vaild email address', '', { timeOut: 3000 });
      } else if (error.status == 400) {
        this.toastr.error('please provide vaild email address', '', { timeOut: 3000 });
      } else if (error.status === 401) {
        this.toastr.warning("Please Access with valid Token", '', { timeOut: 3000 });
        this.Authservice.invalidtokenAccress();
      }
      else if (error.status == 409) {
        this.toastr.error('please provide vaild email address', '', { timeOut: 3000 });
      } else if (error.status == 404) {
        this.toastr.error('please provide vaild email address', '', { timeOut: 3000 });
      } else if (error.status === 409) {
        this.toastr.error('please provide vaild email address', '', { timeOut: 3000 });
      } else if (error.status === 406) {
        this.toastr.error('please provide vaild email address', '', { timeOut: 3000 });
      }
    });


  }



  valid_username(str): boolean {
    var reg = /^[a-zA-Z0-9]*$/;

    if (str.length >= 2 && str.length <= 25) {
      return reg.test(str)
    } else {
      return false
    }

  }



  valid_email(str): boolean {
    var regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regularExpression.test(str)) {
      return false
    }
    else {
      return true;
    }
  }



  valid_password(str): boolean {

    var reg = /^[a-zA-Z0-9]*$/;

    if (str.length >= 6 && str.length <= 12) {
      return reg.test(str)
    } else {
      return false
    }

  }





  // onSiginUpSubmit form ends 
  forgetsubmitbutton = false;

  forgotsubmitserverError: any;

  showerrorForgotDiv = false;
  onForgotSubmit() {

    this.forgotsubmitted = true;
    if (this.forgotpasswordForm.invalid) {
      // this.toastr.error('please enter valid email Address.')
      return;
    }
    this.spinner.show();
    this.forgotpasswordObj = {
      email: this.forgotpasswordForm.value['forgotpasswordemail']
    }
    var email = this.forgotpasswordForm.value['forgotpasswordemail']
    this.Authservice.getforgotpassword(email).subscribe((res: any) => {
      var verificationmsg = res['message'];
      this.forgotsubmitted = false;
      this.forgetsubmitbutton = true;
      this.toastr.success(verificationmsg);
      this.resetForm();
      this.modalclose();
      setTimeout(() => { this.spinner.hide(); }, 1000);
    }, (error: HttpErrorResponse) => {
      setTimeout(() => { this.spinner.hide(); }, 1000);

      this.showerrorForgotDiv = true;
      setTimeout(() => { this.spinner.hide(); }, 1000);
      if (error.status == 500) {
        this.forgotsubmitserverError = error.error.message;
      } else if (error.status == 400) {
        this.forgotsubmitserverError = error.error.message;
      } else if (error.status === 401) {
        this.toastr.warning("Please Access with valid Token", '', { timeOut: 1000 });
        this.Authservice.invalidtokenAccress();
      } else if (error.status == 409) {
        this.forgotsubmitserverError = error.error.message;
      } else if (error.status == 404) {
        this.forgotsubmitserverError = error.error.message;
      }
      else if (error.status === 409) {
        this.forgotsubmitserverError = error.error.message;
      }
      else if (error.status === 406) {
        this.forgotsubmitserverError = error.error.message;
      }   else if (error.status === 502) {
        this.forgotsubmitserverError = "Our site is under maintainance, Please wait for some time and retry again....!";
      }
      else if (error.status === 504) {
        this.forgotsubmitserverError = "Our site is under maintainance, Please wait for some time and retry again....!";
      } 
 




    });

  }

  loginObj = {};

  onLoginSubmit() {


    this.submitted = true;
    if (this.loginForm.invalid) {
      // this.toastr.warning('Please Enter Valid Details');
      return;
    } else {
      this.spinner.show();
      this.loginObj = {
        email: this.loginForm.value['email'],
        password: this.loginForm.value['password']
      };
      this.Authservice.logIn(this.loginObj).subscribe((res) => {
        // var signUpmessage = res; 
        // this.toastr.success(signUpmessage);
        sessionStorage.removeItem("loginModal");
        sessionStorage.setItem('uid', res['id']);
        var login_role = res['roles'];
        var loggedRole = login_role[0];
        sessionStorage.setItem('ocademy_role', loggedRole);
        sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, res['userName']);
        sessionStorage.setItem('eId', res['email']);
        // setTimeout(() => {this.spinner.hide();}, 1000);  
        if (res) {
          var key = 'token';
          var value = res['token'];
          if (value == undefined || value == null || value == '') {
            this.showTab = this.checkIsloogedIn;
            this.hideTab = !this.checkIsloogedIn;
            return;
          } else {
            sessionStorage.setItem(key, value);
            this.showTab = !this.checkIsloogedIn;
            this.hideTab = this.checkIsloogedIn;
          }
          setTimeout(() => { this.spinner.hide(); }, 1000);
          this.toastr.success(res['message'], '', { timeOut: 1000 });
          $('#exampleModal').modal('hide');
          if (this.loadafterloggedPage == undefined) {
            this.router.navigateByUrl('/student')
          } else {
            var currentpath = window.location.href;
            window.location.href = currentpath;
          }

          // this.router.navigateByUrl(this.loadafterloggedPage)

          // .then(() => {
          //   window.location.reload();
          // });
        }

      }, (error) => {
        this.showerrorsigupDiv = true;
        // $('#exampleModal').modal('hide');
        setTimeout(() => { this.spinner.hide(); }, 1000);
        if (error.status == 500) {
          this.userNameAlreadytakerror = error.error.message;
        } else if (error.status == 400) {
          this.userNameAlreadytakerror = error.error.message;
        } else if (error.status === 401) {
          this.toastr.warning("Please Access with valid Token", '', { timeOut: 1000 });
          this.Authservice.invalidtokenAccress();
        }
        else if (error.status == 409) {
          this.userNameAlreadytakerror = error.error.message;
        } else if (error.status == 404) {
          this.userNameAlreadytakerror = error.error.message;
        }
        else if (error.status === 409) {
          this.userNameAlreadytakerror = error.error.message;
        }
        else if (error.status === 406) {
          this.userNameAlreadytakerror = error.error.message;
        }  else if (error.status === 502) {
          this.userNameAlreadytakerror = "Our site is under maintainance, Please wait for some time and retry again....!";
        }
        else if (error.status === 504) {
          this.userNameAlreadytakerror = "Our site is under maintainance, Please wait for some time and retry again....!";
        }
          // } else {
        //   this.userNameAlreadytakerror = error.error.message;
        // }
      });

      this.username = this.loginForm.value['username'];
      this.password = this.loginForm.value['password'];
      this.userName = this.username;
      this.userEmailID = ""
      // this.sendModal();
      this.signupclose();
      this.testLoginUser = this.username;
      this.showUserDiv = false;
      // this.loggedemailAddress = sessionStorage.getItem('eId');
    }
  }

  // for category dropdown
  get_all_dropdown_data: any;
 

  final_sub_dat: any = [];

  very_final_sub_dat: any = [];

  testVal = [];
  subsubtopics = [];
  subsubtcategoryData = [];
  gettingSubSubCat(eve) {
    for (var i = 0; i <= this.get_all_dropdown_data.length - 1; i++) {
      for (var j = 0; j <= this.get_all_dropdown_data[i].subcategories.length - 1; j++) {
        if (this.get_all_dropdown_data[i].subcategories[j].id == eve) {
          this.subsubtopics = this.get_all_dropdown_data[i].subcategories[j].topic;
        }
      }
    }
    this.final_sub_dat = eve.topic;

  }
  showaotucomplete: boolean = false;
  showAutoComplete(val) {
    // alert('hi')
    if (val.length > 0) {
      this.showaotucomplete = true;
    } else {
      this.showaotucomplete = false;
    }
  }

  globalSearch_name: any;
  categorySearch(Val) {
    if (Val !== undefined) {
      var avoidspaces = Val.split(' ').filter(n => n).join(' ');
      if (avoidspaces.length == 0 || Val == '' || Val == null) {
        return;
      } else {
        this.checkCourseName(Val);
        this.router.navigate(['/globalsearch', { cateName: Val }]).then(() => {
          window.location.reload();
        });
      }
    }

    this.searchDivBox = false;
    this.autocomplete.closePanel();

  }

  checkCourseName(coursename): void {
    // send message to subscribers via observable subject
    this.ObservableSer.sendCourseName(coursename);
    // this.router.navigate(['/globalsearch']);
    // .then(() => {
    //       window.location.reload();
    //     });
  }

  activeIndex: any;

  testMYval: any;

  v1: any;
  GlobalSearchMethod(ev) {

    // if(ev.keyCode == 40){
    //   this.nextActiveMatch();
    // }

    // if(ev.keyCode == 38){
    //   this.prevActiveMatch();
    // }

    // if(ev.keyCode == 13){
    // alert(ev.keyCode);
    // }

    if (this.txtsearch.length > 0) {
      this.searchDivBox = true;
    } else {
      this.searchDivBox = false;
    }
  }



  testFunc(ev, val) {
  }


  public nextActiveMatch() {

    // for(var i = 0 ; i<= this.final.length-1;i++){

    this.activeIndex = this.activeIndex < this.final.length - 1 ? ++this.activeIndex : this.activeIndex;

    // }

    // this.activeIndex = this.activeIndex < this.final.length - 1 ? ++this.activeIndex : this.activeIndex;
  }
  public prevActiveMatch() {
    this.activeIndex = this.activeIndex > 0 ? --this.activeIndex : 0;
  }


  testValme(val) {
  }


  gotoTutor() {
    this.router.navigate(['/tutor'])
    // .then(() => {
    //   window.location.reload();
    // });
  }

  mylearning() {
    this.router.navigateByUrl('/student/studentlearning');
  }
  gotocart() {
    var token = sessionStorage.getItem('token');
    if (token == null || token == undefined || token == '') {
      this.openLoginModal()
    } else {
      this.router.navigateByUrl('/student/mycart');

    }
  }

  studentallcourse() {
    this.router.navigateByUrl('/student/studentlearning');
  }


  myOnlineClasses() {
    // this.router.navigateByUrl('/student/studentonlineclass');
  }

  paymentMethod() {
    this.router.navigate(['/student/paymentmethod'], { relativeTo: this.rout })
    // this.router.navigate(['/student/paymentmethod']);
  };

  gotohome() {

    var tok = sessionStorage.getItem('token')

    if (tok == null || tok == undefined) {
      this.router.navigate(['/home']).then(() => {
        window.location.reload();
      });;
    } else {
      this.router.navigate(['/student']).then(() => {
        window.location.reload();
      });
    }
  }

  mycart() {
    this.router.navigateByUrl('/student/mycart');
  }

  gotoLogOut() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.gettoken);
    sessionStorage.clear();
    sessionStorage.clear();

    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
    this.showTab = false;
    this.hideTab = true;
  }

  gotoCateg(val) {
    this.checkCourseName(val);
    this.router.navigate(['/globalsearch', { cateName: val }])
      .then(() => {
        window.location.reload();
      });
    this.showAllCatscls = false;
    this.searchDivBox = false;
    this.autocomplete.closePanel();
  }

  showCatmouseOvered(Val) {
  }

  gotoStudent() {
    this.router.navigate(['/search'])
  }

  studentNotificationMethod() {
    this.router.navigate(['/student/studentNotification'])
  }

  purchasehist() {
    this.router.navigate(['/student/purchasehistory'])
  }
  wishlist1() {
    this.router.navigate(['/student/studentWishlist'])
  }
  gotoprofile() {
    this.router.navigate(['/student/editprofile']);
  }
  openNotificationpopUp = false;

  notificationPopup() {
    this.getAllNotifications();
    this.openNotificationpopUp = !this.openNotificationpopUp;
  }


  getNotify: any;

  getAllNotifications() {
    // this.studentservice.ShowNotificationServices().subscribe((res) => {
    //   this.getNotify = res;
    // }, (error) => {
    // });
  }
  showUserDiv = false;
  showUserDivMethod() {
    this.showUserDiv = !this.showUserDiv;
  }



  showModal(): void {
    $("#myModal").modal('show');
  }
  sendModal(): void {
    //do something here
    this.modalclose();
  }

  modalclose() {
    document.getElementById('closesigninmodal').click();
    document.getElementById('closeforgotmodal').click();
    this.loginForm.reset();
    this.signUpForm.reset();
    this.signupsubmitted = false;
    this.submitted = false;
    this.forgotsubmitted = false;
    this.closeinvalidpop();
    this.showerrorsigupDiv = false;
    this.userNameAlreadytakerror = '';
    // window.location.reload();
  }

  forgotpasswrd() {
    document.getElementById('closesignupmodal').click();
    document.getElementById('closesigninmodal').click();
    this.forgotpasswordForm.reset();

  }

  signupclose() {
    document.getElementById('closesignupmodal').click();
    document.getElementById('closeforgotmodal').click();
    this.signUpForm.reset();
    this.signupsubmitted = false;
    this.showerrorsigupDiv = false;
    this.closeinvalidpop();
    this.userNameAlreadytakerror = '';
    // window.location.reload();
  }

  getAllData() {

    this.showAllCat = this.categoryList;

    // this.spinner.show();
    // setTimeout(() => {	
    //   setTimeout(() => {this.spinner.hide();}, 1000);	
    // }, 3000);	
    // this.category_service.getCategoriesFamily().subscribe(response => {
    //   if (response['status'] == 200) {
    //     this.showAllCat = response['data'].categoryList;
    //     setTimeout(() => { this.spinner.hide(); }, 1000);
    //   }
    // }, (error: HttpErrorResponse) => {
    //   setTimeout(() => { this.spinner.hide(); }, 1000);
    //   this.toastr.error(error.error);
    //   if (error.status === 500) {
    //     return 
    //   }
    //   else if (error.status === 400) {
    //     return 
    //   } else if (error.status === 401) {
    //     this.toastr.warning("Please Access with valid Token", '', { timeOut: 1000 });
    //     this.Authservice.invalidtokenAccress();
    //   } else if (error.status === 404) {
    //     this.toastr.error(error.message);
    //     return 
    //   } else if (error.status === 409) {
    //     return 
    //   }
    //   else if (error.status === 406) {
    //     return 
    //   }
    //   setTimeout(() => { this.spinner.hide(); }, 1000);
    // });
  }
  // mouseoutfun(){	
  //   this.showAllCatscls = false; 	
  // }	
  onovershowSubCat(catname) {
    // this.showAllCatscls = false;
    this.searchbycat_SubCat_topic_Name = catname;
    this.showsubCat = [];
    // $(dropdown-content3)	
    this.showtopicCls = false;
    for (var i = 0; i <= this.showAllCat.length - 1; i++) {
      if (catname == this.showAllCat[i].categoryName) {
        for (var j = 0; j <= this.showAllCat[i].subcategories.length - 1; j++) {
          this.showsubCat.push(this.showAllCat[i].subcategories[j].subCategoriesName);
        }
      }
    }
  }
  showTopicsNames = [];
  showtopicCls: boolean;
  onoverSubCatshowTopics(subcat) {
    this.searchbycat_SubCat_topic_Name = subcat;
    this.showTopicsNames = [];
    for (var i = 0; i <= this.showAllCat.length - 1; i++) {
      for (var j = 0; j <= this.showAllCat[i].subcategories.length - 1; j++) {
        if (subcat == this.showAllCat[i].subcategories[j].subCategoriesName) {
          for (var k = 0; k <= this.showAllCat[i].subcategories[j].topic.length - 1; k++) {
            this.showtopicCls = true;
            this.showTopicsNames.push(this.showAllCat[i].subcategories[j].topic[k].topicName);
          }
        }
      }
    }
  }
  showAllCatscls = false;
  showAllCats() {
    this.showAllCatscls = !this.showAllCatscls;
    this.showtopicCls = false;
  }
  // end get All 

  CATEGORYNAMES = [];
  CATNAME = [];
  final = [];
  gettingCatName() {
    this.spinner.show();
    this.category_service.getAllCourses().subscribe((response: any) => {
      if (response['status'] == 200) {
        setTimeout(() => { this.spinner.hide(); }, 1000);
        var course_List = response['data'];
        this.CATEGORYNAMES = course_List['courseList'];
        this.CATNAME = [];

        if(this.CATEGORYNAMES.length == 0 || this.CATEGORYNAMES == []){


        } else{
          for (var i = 0; i <= this.CATEGORYNAMES.length - 1; i++) {
            this.CATNAME.push(this.CATEGORYNAMES[i].category);
            this.CATNAME.push(this.CATEGORYNAMES[i].topic);
            this.CATNAME.push(this.CATEGORYNAMES[i].courseTitle);
            this.CATNAME.push(this.CATEGORYNAMES[i].subCategory);
            this.final = ([...new Set(this.CATNAME)]);
  
            this.options = this.final.filter(function (el) {
              return el != null;
            });
          }
        }
      }
    }, (error) => {
      setTimeout(() => { this.spinner.hide(); }, 1000);
      if (error.status === 500) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 400) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 401) {
        this.toastr.warning("Please Access with valid Token", '', { timeOut: 1000 });
        this.Authservice.invalidtokenAccress();
      }
      else if (error.status == 404) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 409) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 406) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 204) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      }
      //  else {
      //   this.toastr.error(error.error.message, '', { timeOut: 1000 });
      // }
    });
  }
  MOUSELEAVE() {
    this.showAllCatscls = false
  }
  mouseouthide() {
    this.openNotificationpopUp = false;
  }


  getThecartLength: any;

  getUdserCartData: any;

  getCartLengthMethod() {
    this.spinner.show();
    var userid = sessionStorage.getItem('uid');
    this.studentservice.getCartService(userid).subscribe((response) => {
      if (response['status'] == 200) {
        setTimeout(() => { this.spinner.hide(); }, 1000);
        var cart_List = response['data'];
        var cart_course_data = cart_List['cartcourses'];
        this.getUdserCartData = cart_course_data;
        if (this.getUdserCartData != undefined && this.getUdserCartData != null) {
          this.getThecartLength = this.getUdserCartData.length || 0;
        }
        // this.valueChange.emit(this.getThecartLength);
      }
    }, (error) => {
      setTimeout(() => { this.spinner.hide(); }, 1000);
      if (error.status === 500) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 400) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 401) {
        this.toastr.warning("Please Access with valid Token", '', { timeOut: 1000 });
        this.Authservice.invalidtokenAccress();
      }
      else if (error.status == 404) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 409) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 406) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 204) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      }
      //  else {
      //   this.toastr.error(error.error.message, '', { timeOut: 1000 });
      // }
    });
  }


  navtowishlistMethod() {
    // this.router.navigate(['student/studentlearning']);
    this.router.navigate(['/student/studentWishlist'])

  }


  loginemail = ''
  loginpassword = '';
  signupusername = '';
  signupemail = '';
  signuppassword = '';
  forgotpasswordemaildata = '';
  txtmail: any;
  clearDiv(data) {
    // if(data.length==0){
    this.showerrorsigupDiv = false;
    this.showerrorForgotDiv = false;

    // }else{
    // this.showerrorsigupDiv=false;

    // }
  }


  // search for anything 




  // end search for anything 
  getwishListArr: any;
  AddwishlistDataArr: any;
  wishlist_courses = [];
  wishlistlength;
  getWishListMethod() {
    this.spinner.show();

    this.AddwishlistDataArr = [];
    var userid = sessionStorage.getItem('uid');


    this.studentservice.getWishListService(userid).subscribe((response) => {
      setTimeout(() => { this.spinner.hide(); }, 1000);
      if (response) {
        if (response['status'] == 200) {

          var cart_course_data = response['data'];
          this.wishlist_courses = cart_course_data['wishlistcourses']
          if (this.wishlist_courses != undefined && this.wishlist_courses != null) {
            this.wishlistlength = this.wishlist_courses.length || 0;
          }
        }
      }
    }, (error) => {
      setTimeout(() => { this.spinner.hide(); }, 1000);
      if (error.status === 500) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 400) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 401) {
        this.toastr.warning("Please Access with valid Token", '', { timeOut: 1000 });
        this.Authservice.invalidtokenAccress();
      }
      else if (error.status == 404) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 409) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 406) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      } else if (error.status === 204) {
        this.toastr.error(error.error.message, '', { timeOut: 1000 });
      }
      //  else {
      //   this.toastr.error(error.error.message, '', { timeOut: 1000 });
      // }
    })
  }



  closeinvalidpop() {
    this.showerrorForgotDiv = false;

  }


}

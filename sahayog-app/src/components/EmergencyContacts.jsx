import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Card, CardContent } from "@mui/material";
import { Phone, X } from "lucide-react";
import {
  MapPin,
  AlertTriangle,
  Globe,
  CloudRain,
  Shield,
  LayoutDashboard,
  Languages,
  Hospital
} from "lucide-react";
import { CopyToClipboard } from 'react-copy-to-clipboard';

function EmergencyContacts({openContactsDialog, handleCloseContactsDialog, CopyNumberTooltip, selectedDistrict, setSelectedDistrict}) {

    const districts = [
      "Shimla", "Mandi", "Kangra", "Kullu", "Chamba", 
      "Solan", "Bilaspur", "Hamirpur", "Una", 
      "Kinnaur", "Lahaul & Spiti", "Sirmaur"
    ];
  
    const stateEmergencyNumbers = {
      centralized: "112",
      police: "100",
      fire: "101",
      ambulance: ["102", "108"],
      disasterManagement: {
        helpline: "1077",
        controlRoom: "0177-2812344"
      }
    };
  
    const selectedDistrictData = {
      "Shimla": {
        fire: { emergency: "101", contact: "0177-2800180" },
        police: { emergency: "100", contact: "0177-2656535" },
        hospital: { name: "IGMC", contact: "0177-2652521" }
      },
      "Mandi": {
        fire: { emergency: "101", contact: "01905-222039" },
        police: { emergency: "100", contact: "01905-226151" },
        hospital: { name: "Zonal Hospital", contact: "01905-223491" }
      },
      "Kangra": {
        fire: { emergency: "101", contact: "01892-224595" },
        police: { emergency: "100", contact: "01892-222140" },
        hospital: { name: "DRPGMC Tanda", contact: "01892-267115" }
      },
      "Kullu": {
        fire: { emergency: "101", contact: "01902-222350" },
        police: { emergency: "100", contact: "01902-222383" },
        hospital: { name: "District Hospital", contact: "01902-222527" }
      },
      "Chamba": {
        fire: { emergency: "101", contact: "01899-222222" },
        police: { emergency: "100", contact: "01899-222223" },
        hospital: { name: "District Hospital", contact: "01899-222336" }
      },
      "Solan": {
        fire: { emergency: "101", contact: "01792-220101" },
        police: { emergency: "100", contact: "01792-220101" },
        hospital: { name: "Zonal Hospital", contact: "01792-221392" }
      },
      "Bilaspur": {
        fire: { emergency: "101", contact: "01978-222012" },
        police: { emergency: "100", contact: "01978-224200" },
        hospital: { name: "District Hospital", contact: "01978-222033" }
      },
      "Hamirpur": {
        fire: { emergency: "101", contact: "01972-221515" },
        police: { emergency: "100", contact: "01972-221545" },
        hospital: { name: "Zonal Hospital", contact: "01972-221325" }
      },
      "Una": {
        fire: { emergency: "101", contact: "01975-226252" },
        police: { emergency: "100", contact: "01975-226242" },
        hospital: { name: "Regional Hospital", contact: "01975-226550" }
      },
      "Kinnaur": {
        fire: { emergency: "101", contact: "01786-223492" },
        police: { emergency: "100", contact: "01786-223656" },
        hospital: { name: "District Hospital", contact: "01786-222004" }
      },
      "Lahaul & Spiti": {
        fire: { emergency: "101", contact: "01900-202244" },
        police: { emergency: "100", contact: "01900-202255" },
        hospital: { name: "Keylong Hospital", contact: "01900-222004" }
      },
      "Sirmaur": {
        fire: { emergency: "101", contact: "01702-226108" },
        police: { emergency: "100", contact: "01702-222556" },
        hospital: { name: "Regional Hospital", contact: "01702-222535" }
      }
    };

  return (
    <Dialog 
        open={openContactsDialog} 
        onClose={handleCloseContactsDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '16px',
            boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
          }
        }}
      >
        <DialogTitle 
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-5"
          style={{
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
          }}
        >
          <div className="flex items-center justify-center space-x-4">
            <Phone size={36} className="text-white/90" />
            <span className="text-2xl font-bold tracking-wide drop-shadow-md">
              Himachal Pradesh Emergency Contacts
            </span>
          </div>
          <button
            onClick={handleCloseContactsDialog}
            className="absolute top-4 right-4 bg-red-100 text-red-600 hover:bg-red-200 p-2 rounded-full transition-colors group"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform" />
          </button>
        </DialogTitle>
        
        <DialogContent 
          className="bg-gray-50 p-6 flex space-x-6"
          style={{ 
            maxHeight: '600px', 
            overflow: 'auto' 
          }}
        >
          {/* State-Level Emergencies */}
          <div className="w-1/3 pr-4 border-r border-gray-200 mt-4">
            <h3 className="text-xl font-semibold mb-5 text-gray-800 pb-2 border-b border-gray-300">
              State Emergency Services
            </h3>
            <div className="space-y-4">
              {[
                { 
                  icon: Shield, 
                  iconColor: 'text-blue-600', 
                  label: 'Centralized Emergency', 
                  number: stateEmergencyNumbers.centralized 
                },
                { 
                  icon: AlertTriangle, 
                  iconColor: 'text-red-600', 
                  label: 'Police', 
                  number: stateEmergencyNumbers.police 
                },
                { 
                  icon: CloudRain, 
                  iconColor: 'text-green-600', 
                  label: 'Fire Services', 
                  number: stateEmergencyNumbers.fire 
                },
                { 
                  icon: Phone, 
                  iconColor: 'text-purple-600', 
                  label: 'Ambulance', 
                  number: stateEmergencyNumbers.ambulance.join('/') 
                }
              ].map((emergency, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-4">
                    <emergency.icon className={`${emergency.iconColor} bg-${emergency.iconColor.split('-')[1]}-100 p-2 rounded-lg`} size={40} />
                    <span className="text-gray-800 font-medium">{emergency.label}</span>
                  </div>
                  <CopyNumberTooltip number={emergency.number}>
                    <span className="font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                      {emergency.number}
                    </span>
                  </CopyNumberTooltip>
                </div>
              ))}
            </div>
          </div>
          
          {/* District Contacts */}
          <div className="w-2/3 pl-4">
            <div className="mb-5 mt-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">
                District Emergency Contacts
              </h3>
              <div className="flex flex-wrap gap-2 mb-5">
                {districts.map(district => (
                  <button
                    key={district}
                    onClick={() => setSelectedDistrict(district)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                      ${selectedDistrict === district 
                        ? 'bg-blue-600 text-white scale-105 shadow-md' 
                        : 'bg-gray-200 text-gray-700 hover:bg-blue-100 hover:scale-105'}
                    `}
                  >
                    {district}
                  </button>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-4 pb-3 border-b border-gray-200">
                    <MapPin className="text-blue-600 mr-3" size={32} />
                    <h4 className="text-xl font-bold text-gray-800">{selectedDistrict}</h4>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6">
                    {[
                      {
                        icon: CloudRain,
                        iconColor: 'text-green-600',
                        title: 'Fire Department',
                        emergency: selectedDistrictData[selectedDistrict].fire.emergency,
                        contact: selectedDistrictData[selectedDistrict].fire.contact
                      },
                      {
                        icon: AlertTriangle,
                        iconColor: 'text-red-600',
                        title: 'Police Station',
                        emergency: selectedDistrictData[selectedDistrict].police.emergency,
                        contact: selectedDistrictData[selectedDistrict].police.contact
                      },
                      {
                        icon: Hospital,
                        iconColor: 'text-blue-600',
                        title: 'Hospital',
                        emergency: selectedDistrictData[selectedDistrict].hospital.name,
                        contact: selectedDistrictData[selectedDistrict].hospital.contact
                      }
                    ].map((section, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-50 p-4 rounded-xl border-l-4 hover:bg-white transition-all duration-300"
                        style={{ borderColor: section.iconColor }}
                      >
                        <div className="flex items-center mb-3">
                          <section.icon 
                            className={`${section.iconColor} bg-${section.iconColor.split('-')[1]}-100 p-2 rounded-lg mr-3`} 
                            size={38} 
                          />
                          <span className="font-bold text-gray-700">{section.title}</span>
                        </div>
                        <div className="text-gray-600">
                          <p className="font-medium mb-1">{section.emergency}</p>
                          <CopyNumberTooltip number={section.contact}>
                            <p className="text-sm text-gray-500 cursor-pointer hover:text-blue-600">
                              Contact: {section.contact}
                            </p>
                          </CopyNumberTooltip>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  )
}

export default EmergencyContacts
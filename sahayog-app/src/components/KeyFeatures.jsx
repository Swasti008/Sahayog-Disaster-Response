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

function KeyFeatures() {
  return (
    <section className="mt-16 bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <hr className="border-t-2 border-blue-200 mb-8 w-24 mx-auto" />
            <h2 className="text-center text-4xl font-extrabold mb-12 text-gray-800 tracking-tight">
              Powerful Platform Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group">
                <Card
                  className="
        bg-white 
        shadow-lg 
        hover:shadow-2xl 
        hover:scale-101 
        transition-all 
        duration-500 
        ease-in-out 
        border-t-4 
        border-blue-500 
        rounded-xl 
        overflow-hidden
      "
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className="
          bg-blue-100 
          text-blue-600 
          rounded-full 
          w-20 
          h-20 
          flex 
          items-center 
          justify-center 
          mx-auto 
          mb-6 
          transform 
          group-hover:rotate-12 
          transition-transform 
          duration-500
        "
                    >
                      <Globe size={42} className="text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                      Real-Time Data Aggregation
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Collects and analyzes data from multiple sources including
                      social media, news outlets, and user reports to provide
                      accurate and timely disaster information.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Feature 2 */}
              <div className="group">
                <Card
                  className="
        bg-white 
        shadow-lg 
        hover:shadow-2xl 
        hover:scale-101 
        transition-all 
        duration-500 
        ease-in-out 
        border-t-4 
        border-green-500 
        rounded-xl 
        overflow-hidden
      "
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className="
          bg-green-100 
          text-green-600 
          rounded-full 
          w-20 
          h-20 
          flex 
          items-center 
          justify-center 
          mx-auto 
          mb-6 
          transform 
          group-hover:rotate-12 
          transition-transform 
          duration-500
        "
                    >
                      <Languages size={42} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                      Multi-Language Support
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Seamlessly supports multiple languages for content and
                      interface, enabling users from diverse regions to interact
                      with the platform effectively and intuitively.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Feature 3 */}
              <div className="group">
                <Card
                  className="
        bg-white 
        shadow-lg 
        hover:shadow-2xl 
        hover:scale-101 
        transition-all 
        duration-500 
        ease-in-out 
        border-t-4 
        border-purple-500 
        rounded-xl 
        overflow-hidden
      "
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className="
          bg-purple-100 
          text-purple-600 
          rounded-full 
          w-20 
          h-20 
          flex 
          items-center 
          justify-center 
          mx-auto 
          mb-6 
          transform 
          group-hover:rotate-12 
          transition-transform 
          duration-500
        "
                    >
                      <LayoutDashboard size={42} className="text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                      User-Friendly Dashboard
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Provides disaster management agencies with a streamlined,
                      intuitive dashboard for rapid access to categorized
                      reports, real-time alerts, and critical information.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
  )
}

export default KeyFeatures
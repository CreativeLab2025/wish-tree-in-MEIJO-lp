"use client";
import Image from "next/image";
import Title from "@/components/Title";
import AppleRotation from "@/components/AppleRotation";
import CircleExpand from "@/components/CircleExpand";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header section */}
      <section className="h-screen flex items-center justify-center">
        <Title />
      </section>

      {/* Apple rotation demo section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-gray-50">
        <div className="container mx-auto px-4">


          {/* Large apple in center */}
          <div className="flex justify-center mb-20">
            <AppleRotation 
              size="large" 
              rotationSpeed={1.2}
              scaleRange={[0.8, 1.8]}
              className="mx-auto"
            />
          </div>

          {/* Content with medium apple */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="flex justify-center">
              <AppleRotation 
                size="medium" 
                rotationSpeed={0.8}
                scaleRange={[0.6, 1.4]}
              />
            </div>
          </div>

          {/* Small apples grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <AppleRotation 
                size="small" 
                rotationSpeed={1.5}
                scaleRange={[0.7, 1.3]}
                className="mx-auto mb-4"
              />
            </div>
            <div className="text-center">
              <AppleRotation 
                size="small" 
                rotationSpeed={0.9}
                scaleRange={[0.5, 1.5]}
                className="mx-auto mb-4"
              />
            </div>
            <div className="text-center">
              <AppleRotation 
                size="small" 
                rotationSpeed={1.8}
                scaleRange={[0.8, 1.2]}
                className="mx-auto mb-4"
              />
            </div>
          </div>

          {/* Final large apple */}
          <div className="text-center">
            <AppleRotation 
              size="large" 
              rotationSpeed={2.0}
              scaleRange={[0.3, 2.0]}
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Spacer for more scrolling */}
      <section className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
        </div>
      </section>
      <div style={{ minHeight: 1200, position: 'relative',backgroundColor: 'red' }}>
        <CircleExpand minSize={20} maxSize={2400} colorClass="bg-orange-400" />

      </div>
    </div>
  );
}

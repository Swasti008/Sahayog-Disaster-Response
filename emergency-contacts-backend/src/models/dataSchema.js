import { z } from 'zod';

// Define the Zod schema for a Hospital
const HospitalSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  contact_number: z.string().min(1, 'Contact number is required'),
});

// Define the Zod schema for the District
const DistrictSchema = z.object({
  name: z.string().min(1, 'District name is required'),
  fire_department: z.object({
    emergency_number: z.string().min(1, 'Emergency number is required'),
    contact_number: z.string().min(1, 'Contact number is required'),
  }),
  police_station: z.object({
    emergency_number: z.string().min(1, 'Emergency number is required'),
    contact_number: z.string().min(1, 'Contact number is required'),
  }),
  hospitals: z.array(HospitalSchema),
});

// Define the Zod schema for the Emergency Contact object
const EmergencyContactSchema = z.object({
  state: z.string().min(1, 'State is required'),
  std_code: z.string().min(1, 'STD code is required'),
  emergency_numbers: z.object({
    centralized_emergency_number: z.string().min(1, 'Centralized emergency number is required'),
    police: z.string().min(1, 'Police emergency number is required'),
    fire_services: z.string().min(1, 'Fire services emergency number is required'),
    ambulance: z.array(z.string()).nonempty('At least one ambulance number is required'),
    disaster_management: z.object({
      helpline: z.string().min(1, 'Disaster management helpline is required'),
      control_room: z.string().min(1, 'Disaster management control room is required'),
    }),
  }),
  disaster_relief: z.object({
    flood_relief: z.object({
      helpline: z.string().min(1, 'Flood relief helpline is required'),
      control_room: z.string().min(1, 'Flood relief control room is required'),
    }),
    earthquake_relief: z.object({
      helpline: z.string().min(1, 'Earthquake relief helpline is required'),
      control_room: z.string().min(1, 'Earthquake relief control room is required'),
    }),
    fire_relief: z.object({
      helpline: z.string().min(1, 'Fire relief helpline is required'),
      control_room: z.string().min(1, 'Fire relief control room is required'),
    }),
  }),
  districts: z.array(DistrictSchema),
});

export { EmergencyContactSchema, HospitalSchema, DistrictSchema };

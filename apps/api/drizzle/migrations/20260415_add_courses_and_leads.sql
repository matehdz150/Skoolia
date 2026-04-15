-- Enums
CREATE TYPE course_modality AS ENUM ('online', 'presencial', 'híbrido');
CREATE TYPE course_duration_unit AS ENUM ('horas', 'semanas');
CREATE TYPE course_difficulty AS ENUM ('básico', 'intermedio', 'avanzado');
CREATE TYPE lead_status AS ENUM ('pending', 'contacted', 'enrolled', 'rejected');

-- Tabla courses
CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(255) NOT NULL,
  description text NOT NULL,
  modality course_modality NOT NULL,
  duration_value integer NOT NULL,
  duration_unit course_duration_unit NOT NULL,
  price decimal(10,2) NOT NULL,
  difficulty_level course_difficulty NOT NULL,
  certification boolean NOT NULL DEFAULT false,
  school_id uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla leads
CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES public_users(id) ON DELETE CASCADE,
  school_id uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE SET NULL,
  status lead_status NOT NULL DEFAULT 'pending',
  source varchar(100) NOT NULL,
  created_at timestamptz DEFAULT now()
);

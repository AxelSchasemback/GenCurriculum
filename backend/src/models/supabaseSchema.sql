-- Esquema de la base de datos para Supabase

-- Tabla de plantillas
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de currículums
CREATE TABLE resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES templates(id),
  title TEXT NOT NULL,
  personal_info JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de experiencias
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
  position TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de educación
CREATE TABLE education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  location TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de habilidades
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Políticas de seguridad (RLS - Row Level Security)

-- Habilitar RLS en todas las tablas
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Políticas para templates (públicas, solo lectura)
CREATE POLICY "Templates son públicas para lectura" ON templates
  FOR SELECT USING (true);

-- Políticas para resumes (privadas, solo el propietario puede acceder)
CREATE POLICY "Usuarios pueden ver sus propios currículums" ON resumes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden crear sus propios currículums" ON resumes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden actualizar sus propios currículums" ON resumes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden eliminar sus propios currículums" ON resumes
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas para experiences (privadas, solo el propietario puede acceder)
CREATE POLICY "Usuarios pueden ver sus propias experiencias" ON experiences
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM resumes
      WHERE resumes.id = experiences.resume_id
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Usuarios pueden crear sus propias experiencias" ON experiences
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM resumes
      WHERE resumes.id = experiences.resume_id
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Usuarios pueden actualizar sus propias experiencias" ON experiences
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM resumes
      WHERE resumes.id = experiences.resume_id
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Usuarios pueden eliminar sus propias experiencias" ON experiences
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM resumes
      WHERE resumes.id = experiences.resume_id
      AND resumes.user_id = auth.uid()
    )
  );

-- Políticas similares para education
CREATE POLICY "Usuarios pueden ver su propia educación" ON education
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM resumes
      WHERE resumes.id = education.resume_id
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Usuarios pueden crear su propia educación" ON education
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM resumes
      WHERE resumes.id = education.resume_id
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Usuarios pueden actualizar su propia educación" ON education
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM resumes
      WHERE resumes.id = education.resume_id
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Usuarios pueden eliminar su propia educación" ON education
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM resumes
      WHERE resumes.id = education.resume_id
      AND resumes.user_id = auth.uid()
    )
  );

-- Políticas similares para skills
CREATE POLICY "Usuarios pueden ver sus propias habilidades" ON skills
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM resumes
      WHERE resumes.id = skills.resume_id
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Usuarios pueden crear sus propias habilidades" ON skills
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM resumes
      WHERE resumes.id = skills.resume_id
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Usuarios pueden actualizar sus propias habilidades" ON skills
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM resumes
      WHERE resumes.id = skills.resume_id
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Usuarios pueden eliminar sus propias habilidades" ON skills
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM resumes
      WHERE resumes.id = skills.resume_id
      AND resumes.user_id = auth.uid()
    )
  );

-- Insertar algunas plantillas de ejemplo
INSERT INTO templates (name, description, image_url) VALUES
('Profesional Moderno', 'Diseño limpio y profesional ideal para la mayoría de industrias', 'https://via.placeholder.com/150?text=Template+1'),
('Creativo', 'Perfecto para diseñadores, artistas y profesionales creativos', 'https://via.placeholder.com/150?text=Template+2'),
('Ejecutivo', 'Elegante y formal para roles de liderazgo y gerencia', 'https://via.placeholder.com/150?text=Template+3'),
('Tecnológico', 'Ideal para profesionales de TI, desarrolladores y técnicos', 'https://via.placeholder.com/150?text=Template+4'),
('Minimalista', 'Simple y efectivo, enfocado en la información esencial', 'https://via.placeholder.com/150?text=Template+5'),
('Académico', 'Diseñado para profesores, investigadores y académicos', 'https://via.placeholder.com/150?text=Template+6'); 
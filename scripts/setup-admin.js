const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

// Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Admin User Daten
const adminEmail = process.env.ADMIN_EMAIL || 'admin@3uck.store';
const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
const adminName = process.env.ADMIN_NAME || 'Admin User';

async function setupAdminUser() {
    try {
        console.log('Setting up admin user...');
        
        // Check if admin already exists
        const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', adminEmail)
            .single();

        if (existingUser) {
            console.log('Admin user already exists:', existingUser.email);
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(adminPassword, 12);
        
        // Create admin user
        const { data, error } = await supabase
            .from('users')
            .insert({
                email: adminEmail,
                name: adminName,
                password: hashedPassword,
                provider: 'credentials',
                provider_id: 'credentials_admin'
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating admin user:', error);
            return;
        }

        console.log('Admin user created successfully:');
        console.log('Email:', adminEmail);
        console.log('Password:', adminPassword);
        console.log('User ID:', data.id);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run setup
setupAdminUser();
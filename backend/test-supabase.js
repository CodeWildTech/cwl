import { supabase } from './config/supabase.js';

async function testSupabase() {
    console.log('Testing Supabase Connection...');

    try {
        // Try to fetch a single row from enquiries to verify connection
        const { data, error, count } = await supabase
            .from('enquiries')
            .select('*', { count: 'exact', head: true });

        if (error) {
            console.error('❌ Supabase Error:', error.message);
            if (error.message.includes('invalid input syntax')) {
                console.warn('⚠️ Note: This might be expected if the credentials are still placeholders.');
            }
            process.exit(1);
        }

        console.log('✅ Supabase connected successfully!');
        if (data && data.length > 0) {
            console.log('Sample row columns:', Object.keys(data[0]));
            console.log('Sample data:', data[0]);
        }
        console.log(`📊 Current count of enquiries: ${count}`);
        process.exit(0);
    } catch (err) {
        console.error('❌ Unexpected Error:', err.message);
        process.exit(1);
    }
}

testSupabase();

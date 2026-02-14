import { supabase } from "../config/supabase.js";

export const getEnquiries = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Error fetching enquiries:", err);
    res.status(500).json({ error: "Server error" });
  }
};

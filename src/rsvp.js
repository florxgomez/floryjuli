import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

document.getElementById("rsvp-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  const { error } = await supabase.from("rsvps").insert([
    {
      name: data.name,
      dietary: data.dietary,
      attendance: data.attendance,
    },
  ]);

  if (error) {
    alert("Error al enviar RSVP. Inténtalo de nuevo.");
    console.error(error);
  } else {
    alert("¡Gracias por tu RSVP!");
    e.target.reset();
  }
});

import React, { useMemo } from 'react';

const MealPrep = ({ recipes }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const weeklyPlan = useMemo(() => {
    // Picking unique-ish recipes for the week
    const shuffled = [...recipes].sort(() => 0.5 - Math.random());
    return days.map((day, index) => ({
      day,
      lunch: shuffled[index % recipes.length],
      dinner: shuffled[(index + 7) % recipes.length]
    }));
  }, [recipes]);

  const ingredientCounts = {};
  weeklyPlan.forEach(plan => {
      [...plan.lunch.ingredients, ...plan.dinner.ingredients].forEach(ing => {
          if (ing === "Salt") return; // already a standard pantry staple
          ingredientCounts[ing] = (ingredientCounts[ing] || 0) + 1;
      });
  });

  return (
    <div className="meal-prep animate" style={{ paddingBottom: '5rem' }}>
      <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem', textAlign: 'center' }}>Hyper-Efficient <span style={{ color: 'var(--primary-red)' }}>Meal Prep</span></h2>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '4rem', fontSize: '1.2rem' }}>
        Your complete weekly cooking guide, optimized for parallel execution.
      </p>

      {/* Shopping List */}
      <div className="glass" style={{ padding: '3rem', marginBottom: '4rem', borderTop: '4px solid var(--primary-red)' }}>
        <h3 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '1.5rem' }}>🛒 The Master Shopping List</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Buy only what you need for the week. Since recipes are max 6 ingredients, it stays compact.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {Object.entries(ingredientCounts).map(([ing, count]) => (
                <div key={ing} style={{ padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.9rem' }}>
                    <strong style={{ color: 'var(--accent-gold)' }}>{count}x</strong> {ing}
                </div>
            ))}
        </div>
      </div>

      {/* Parallel Cooking Guide */}
      <div className="glass" style={{ padding: '3rem', marginBottom: '2rem', border: '1px solid var(--accent-gold)' }}>
        <h3 style={{ color: 'var(--accent-gold)', fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
            ⚡ Parallel Prep Guide (Sunday Routine)
        </h3>
        <p style={{ marginBottom: '2rem', color: 'var(--text-cream)' }}>Cook your lunches and dinners for Monday through Wednesday at once, in under 45 minutes.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px' }}>
                <h4 style={{ color: 'var(--primary-red)', marginBottom: '1rem' }}>1. The Big Wash (0-10m)</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Clean and chop your first half of the proteins. Divide them directly into your meal-prep containers to save dishes.
                </p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px' }}>
                <h4 style={{ color: 'var(--primary-red)', marginBottom: '1rem' }}>2. Multi-Stove Burn (10-30m)</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Use 2 large pans or an oven. Marinate proteins in their primary spice (e.g. Garam Masala) and sear all bases simultaneously until 80% cooked.
                </p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px' }}>
                <h4 style={{ color: 'var(--primary-red)', marginBottom: '1rem' }}>3. The Flavor Toss (30-40m)</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Distribute the cooked bases back to their containers. Add the specific exact quantities of sauces/spices. Seal and fridge.
                </p>
            </div>
        </div>
      </div>

      {/* Mid-Week Plan */}
      <div className="glass" style={{ padding: '3rem', marginBottom: '5rem', border: '1px solid var(--primary-red)' }}>
        <h3 style={{ color: 'var(--primary-red)', fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
            🔄 Mid-Week Refresh (Wednesday Routine)
        </h3>
        <p style={{ marginBottom: '2rem', color: 'var(--text-cream)' }}>Cook your meals for Thursday through Sunday to keep everything tasting freshly cooked.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px' }}>
                <h4 style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>1. The Fresh Chop (0-10m)</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Prepare the remaining proteins from your Master Shopping List exactly as portioned.
                </p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px' }}>
                <h4 style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>2. Quick Searing (10-25m)</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Just like Sunday, cook all base proteins to 80% doneness on high heat to lock in moisture safely for the fridge.
                </p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px' }}>
                <h4 style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>3. The Precision Toss (25-35m)</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Mix in your exact calculated quantities for the fusion sauces (e.g. 2 tbsp Soy Sauce for Chinese, 1/4 cup Basil for Italian).
                </p>
            </div>
        </div>
      </div>

      {/* Weekly Schedule with Full Recipes */}
      <h3 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Daily Breakdown</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr)', gap: '4rem' }}>
        {weeklyPlan.map((plan) => (
          <div key={plan.day} className="glass" style={{ padding: '3rem', position: 'relative', overflow: 'hidden', borderRadius: '24px' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, height: '4px', width: '100%', background: 'linear-gradient(to right, var(--primary-red), var(--accent-gold))' }}></div>
            <h3 style={{ color: 'white', marginBottom: '3rem', fontSize: '2.5rem' }}>{plan.day}</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                {/* LUNCH */}
                <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', borderLeft: '4px solid var(--primary-red)' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--primary-red)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Lunch ({plan.lunch.health})</div>
                  <h4 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '1.5rem', lineHeight: '1.2' }}>{plan.lunch.title}</h4>
                  
                  <div style={{ marginBottom: '2rem' }}>
                      <strong style={{ color: 'var(--accent-gold)', display: 'block', marginBottom: '0.5rem' }}>Ingredients:</strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {plan.lunch.ingredients.map(ing => (
                            <span key={ing} style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '4px' }}>{ing}</span>
                        ))}
                      </div>
                  </div>

                  <div>
                      <strong style={{ color: 'var(--accent-gold)', display: 'block', marginBottom: '1rem' }}>Method ( {plan.lunch.time} ):</strong>
                      <ol style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                          {plan.lunch.instructions.map((step, idx) => (
                              <li key={idx} style={{ marginBottom: '0.5rem' }}>{step}</li>
                          ))}
                      </ol>
                  </div>
                </div>

                {/* DINNER */}
                <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', borderLeft: '4px solid var(--accent-gold)' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Dinner ({plan.dinner.health})</div>
                  <h4 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '1.5rem', lineHeight: '1.2' }}>{plan.dinner.title}</h4>
                  
                  <div style={{ marginBottom: '2rem' }}>
                      <strong style={{ color: 'var(--primary-red)', display: 'block', marginBottom: '0.5rem' }}>Ingredients:</strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {plan.dinner.ingredients.map(ing => (
                            <span key={ing} style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '4px' }}>{ing}</span>
                        ))}
                      </div>
                  </div>

                  <div>
                      <strong style={{ color: 'var(--primary-red)', display: 'block', marginBottom: '1rem' }}>Method ( {plan.dinner.time} ):</strong>
                      <ol style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                          {plan.dinner.instructions.map((step, idx) => (
                              <li key={idx} style={{ marginBottom: '0.5rem' }}>{step}</li>
                          ))}
                      </ol>
                  </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPrep;

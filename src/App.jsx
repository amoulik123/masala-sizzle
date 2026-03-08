import React, { useState, useEffect, useMemo } from 'react';
import { recipes } from './data/recipes';
import Carousel from './components/Carousel';
import MealPrep from './components/MealPrep';

function App() {
  const [view, setView] = useState('explore'); // 'explore' or 'meal-prep'
  const [filter, setFilter] = useState('All');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('masala_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('masala_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const featuredRecipes = useMemo(() => {
    return [...recipes].sort(() => 0.5 - Math.random()).slice(0, 5);
  }, []);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesFilter = filter === 'All' || 
                         (filter === 'Favorites' ? favorites.includes(recipe.id) : recipe.category === filter);
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = ['All', 'Chicken', 'Mutton', 'Egg', 'Indo-Chinese', 'Indo-Italian', 'Favorites'];

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar glass" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100, padding: '1rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.8rem', cursor: 'pointer' }} onClick={() => { setView('explore'); setFilter('All'); }}>
            Masala <span style={{ color: 'var(--primary-red)' }}>Sizzle</span>
          </h1>
          
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <span 
              onClick={() => setView('explore')} 
              style={{ cursor: 'pointer', fontWeight: view === 'explore' ? 'bold' : 'normal', color: view === 'explore' ? 'var(--accent-gold)' : 'white' }}
            >
              Explore
            </span>
            <span 
              onClick={() => setView('meal-prep')} 
              style={{ cursor: 'pointer', fontWeight: view === 'meal-prep' ? 'bold' : 'normal', color: view === 'meal-prep' ? 'var(--accent-gold)' : 'white' }}
            >
              Meal Prep
            </span>
            
            {view === 'explore' && (
              <input 
                type="text" 
                placeholder="Find 500+ recipes..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass"
                style={{ padding: '0.5rem 1.2rem', border: '1px solid rgba(255,255,255,0.2)', color: 'white', outline: 'none', borderRadius: '30px', fontSize: '0.8rem' }}
              />
            )}
          </div>
        </div>
      </nav>

      {view === 'explore' ? (
        <>
          {/* Hero Section */}
          <header className="hero" style={{ 
            height: '50vh', 
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("/images/hero.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: '60px'
          }}>
            <div className="animate">
              <h2 style={{ fontSize: '4rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>Diverse. Simple. <br/>Healthy.</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-cream)', maxWidth: '600px', margin: '0 auto', fontWeight: '300' }}>
                500+ Curated Indian Fusion Recipes. <br/>
                Always 6 ingredients. Sub-20 minutes.
              </p>
            </div>
          </header>

          {/* Main Content */}
          <main className="container" style={{ padding: '3rem 0' }}>
            
            <div style={{ marginBottom: '4rem' }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--accent-gold)' }}>Daily Inspiration</h3>
                <Carousel items={featuredRecipes} onSelect={setSelectedRecipe} />
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    background: filter === cat ? 'var(--primary-red)' : 'transparent',
                    color: filter === cat ? 'white' : 'var(--text-cream)',
                    border: `1px solid ${filter === cat ? 'var(--primary-red)' : 'var(--accent-gold)'}`,
                    padding: '0.5rem 1.5rem',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '2rem' 
            }}>
              {filteredRecipes.map(recipe => (
                <div 
                  key={recipe.id} 
                  className="recipe-card glass"
                  style={{ 
                    overflow: 'hidden', 
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    position: 'relative',
                    borderRadius: '16px'
                  }}
                  onClick={() => setSelectedRecipe(recipe)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                    <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button 
                      onClick={(e) => toggleFavorite(e, recipe.id)}
                      style={{
                        position: 'absolute', top: '12px', right: '12px',
                        background: 'rgba(0,0,0,0.4)', border: 'none',
                        borderRadius: '50%', width: '40px', height: '40px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', fontSize: '1.2rem',
                        color: favorites.includes(recipe.id) ? 'var(--primary-red)' : 'white',
                        transition: 'var(--transition)',
                        backdropFilter: 'blur(5px)'
                      }}
                    >
                      {favorites.includes(recipe.id) ? '❤️' : '🤍'}
                    </button>
                    <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.7)', padding: '3px 10px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold' }}>
                        {recipe.health}
                    </div>
                  </div>
                  <div style={{ padding: '1.2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <span style={{ color: 'var(--primary-red)', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{recipe.category}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>{recipe.ingredients.length} Items</span>
                    </div>
                    <h3 style={{ margin: '0.4rem 0', fontSize: '1.4rem' }}>{recipe.title}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.8rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>⏱ {recipe.time}</span>
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </>
      ) : (
        <div className="container" style={{ padding: '8rem 0' }}>
          <MealPrep recipes={recipes} />
        </div>
      )}

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div 
          onClick={() => setSelectedRecipe(null)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.95)', zIndex: 1000,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            padding: '2rem'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="glass"
            style={{
              maxWidth: '900px', width: '100%', maxHeight: '90vh', overflowY: 'auto',
              padding: '0', position: 'relative', borderRadius: '24px'
            }}
          >
            <button 
              onClick={() => setSelectedRecipe(null)}
              style={{ 
                position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.5)', 
                border: 'none', color: 'white', fontSize: '1.2rem', width: '35px', height: '35px',
                borderRadius: '50%', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              &times;
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '0' }}>
              <div style={{ height: '100%', minHeight: '400px' }}>
                <img src={selectedRecipe.image} alt={selectedRecipe.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '3rem' }}>
                <span style={{ color: 'var(--primary-red)', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.8rem' }}>{selectedRecipe.category}</span>
                <h2 style={{ fontSize: '2.8rem', marginBottom: '0.5rem', lineHeight: '1.1' }}>{selectedRecipe.title}</h2>
                <p style={{ color: 'var(--accent-gold)', marginBottom: '2rem', fontSize: '1rem' }}>{selectedRecipe.health}</p>
                
                <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                   <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>PREP TIME</div>
                        <div style={{ fontWeight: '600' }}>{selectedRecipe.time}</div>
                   </div>
                   <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>DIFFICULTY</div>
                        <div style={{ fontWeight: '600' }}>{selectedRecipe.difficulty}</div>
                   </div>
                   <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>INGREDIENTS</div>
                        <div style={{ fontWeight: '600' }}>{selectedRecipe.ingredients.length}</div>
                   </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2.5rem' }}>
                    <div>
                        <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--accent-gold)' }}>Ingredients</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                        {selectedRecipe.ingredients.map((ing, i) => (
                            <li key={i} style={{ marginBottom: '0.7rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem', fontSize: '0.9rem' }}>{ing}</li>
                        ))}
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--accent-gold)' }}>Simple Steps</h4>
                        <ol style={{ paddingLeft: '1rem' }}>
                        {selectedRecipe.instructions.map((step, i) => (
                            <li key={i} style={{ marginBottom: '0.8rem', lineHeight: '1.4', fontSize: '0.9rem' }}>{step}</li>
                        ))}
                        </ol>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="glass" style={{ padding: '4rem 0', marginTop: '4rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Masala Sizzle</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto', fontSize: '1rem' }}>
            Diverse. Simple. Sub-20. Healthy. <br/>
            Your daily hub for Indian fusion fitness.
        </p>
      </footer>
    </div>
  );
}

export default App;

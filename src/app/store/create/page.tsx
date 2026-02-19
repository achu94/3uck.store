---
import { getSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default async function CreateStorePage() {
  const supabase = getSupabaseClient();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
              <span className="font-bold text-xl">3uck.store</span>
            </div>
            <a
              href="/store/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Zurück zum Dashboard
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              🏪 Store erstellen
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Starte deinen 3D-Druck-Modelle & Prints Business
            </p>
          </div>

          {/* Store Creation Form */}
          <Card className="border rounded-xl bg-white shadow-lg">
            <CardHeader>
              <CardTitle>📝 Store-Details</CardTitle>
              <CardDescription>
                Fülle die Informationen für deinen neuen Store aus.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateStoreForm supabase={supabase} />
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <InfoCard
              title="💼 Vorteile"
              description={[
                "Eigene Store-Seite",
                "Modelle & Prints verkaufen",
                "Kunden-Bestellungen",
                "Analytics Dashboard",
              ]}
            />
            <InfoCard
              title="🚀 Starte jetzt"
              description={[
                "Kostenlos starten",
                "Keine monatlichen Gebühren",
                "Nur Verkaufskommission",
                "Support bei Fragen",
              ]}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 3uck.store. Alle Rechte vorbehalten.</p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/achu94/3uck.store" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                GitHub
              </a>
              <a href="/support" className="hover:text-foreground transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CreateStoreForm({ supabase }: { supabase: any }) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate slug
      const slugRegex = /^[a-z0-9-]+$/;
      if (!slugRegex.test(slug)) {
        setError('Der Slug darf nur Buchstaben, Zahlen und Bindestriche enthalten!');
        setLoading(false);
        return;
      }

      // Check if store with slug already exists
      const { data: existingStore } = await supabase
        .from('stores')
        .select('id, slug')
        .eq('slug', slug)
        .single();

      if (existingStore) {
        setError(`Der Slug "${slug}" existiert bereits! Bitte wähle einen anderen Slug.`);
        setLoading(false);
        return;
      }

      // Create store
      const { data, error: createError } = await supabase
        .from('stores')
        .insert([
          {
            name,
            slug,
            description,
            category_id: category,
          },
        ])
        .select()
        .single();

      if (createError) {
        console.error('Create Store Error:', createError);
        setError('Fehler beim Erstellen des Stores: ' + createError.message);
        setLoading(false);
        return;
      }

      // Success
      router.push(`/store/${data.slug}`);
    } catch (err) {
      console.error('Create Store Error:', err);
      setError('Ein Fehler ist aufgetreten! Bitte versuche es später erneut.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCreateStore} className="space-y-6">
      {/* Store Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Store Name *</Label>
        <Input
          id="name"
          placeholder="Hans's 3D-Druck"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full"
        />
      </div>

      {/* Store Slug */}
      <div className="space-y-2">
        <Label htmlFor="slug">Store Slug *</Label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">3uck.store/</span>
          <Input
            id="slug"
            placeholder="hans-3d-druck"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
            required
            className="flex-1"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Der Slug muss einzigartig sein und darf nur Buchstaben, Zahlen und Bindestriche enthalten.
        </p>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Beschreibung</Label>
        <Textarea
          id="description"
          placeholder="Beschreibe deinen Store..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full"
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Kategorie</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wähle eine Kategorie..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3d-models">3D-Modelle</SelectItem>
            <SelectItem value="3d-prints">3D-Drucke</SelectItem>
            <SelectItem value="3d-files">3D-Dateien (STL)</SelectItem>
            <SelectItem value="3d-scans">3D-Scans</SelectItem>
            <SelectItem value="3d-tutorials">3D-Tutorials</SelectItem>
            <SelectItem value="3d-services">3D-Services</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
          <p className="font-medium">❌ {error}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex items-center gap-4">
        <Button
          type="submit"
          className="flex-1 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? 'Wird erstellt...' : '🚀 Store erstellen'}
        </Button>
        <a
          href="/store/dashboard"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Abbrechen
        </a>
      </div>
    </form>
  );
}

function InfoCard({ title, description }: { title: string; description: string[] }) {
  return (
    <Card className="border rounded-xl p-6 bg-white">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {description.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="text-muted-foreground">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

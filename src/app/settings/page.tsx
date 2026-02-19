---
import { getSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { getAuth } from '@supabase/auth-helpers-nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toast } from '@/components/ui/toast';

export default async function SettingsPage() {
  const supabase = getSupabaseClient();

  // Fetch user settings
  const { data: user } = await getAuth();
  const userId = user?.id;

  let settings = {};
  if (userId) {
    const { data: userSettings } = await supabase
      .from('users')
      .select('email, full_name, avatar_url, phone, address, bio')
      .eq('id', userId)
      .single();

    settings = userSettings || {};
  }

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
              ⚙️ User Settings
            </h1>
            <p className="text-lg text-muted-foreground">
              Verwalte dein Profil und Einstellungen
            </p>
          </div>

          {/* Settings Form */}
          <Card className="border rounded-xl bg-white shadow-lg">
            <CardHeader>
              <CardTitle>👤 Profil-Einstellungen</CardTitle>
              <CardDescription>
                Aktualisiere deine persönlichen Daten und Einstellungen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsForm settings={settings} userId={userId} />
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border rounded-xl p-6 bg-white mt-8">
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">⚠️ Danger Zone</h2>
                <p className="text-sm text-muted-foreground">Achtung: Diese Aktionen sind nicht umkehrbar!</p>
              </div>
              <div className="space-y-4">
                <DangerAction
                  title="📝 Alle Listings löschen"
                  description="Lösche alle deine Listings und Store-Daten. Dies kann nicht rückgängig gemacht werden!"
                  buttonText="Alle Listings löschen"
                  buttonVariant="destructive"
                />
                <DangerAction
                  title="🗄️ Store löschen"
                  description="Lösche deinen gesamten Store. Dies kann nicht rückgängig gemacht werden!"
                  buttonText="Store löschen"
                  buttonVariant="destructive"
                />
                <DangerAction
                  title="👤 Account löschen"
                  description="Lösche deinen gesamten Account. Alle Daten werden gelöscht und können nicht wiederhergestellt werden!"
                  buttonText="Account löschen"
                  buttonVariant="destructive"
                />
              </div>
            </CardContent>
          </Card>
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

function SettingsForm({ settings, userId }: { settings: any; userId: string }) {
  const [name, setName] = useState(settings.full_name || '');
  const [email, setEmail] = useState(settings.email || '');
  const [phone, setPhone] = useState(settings.phone || '');
  const [address, setAddress] = useState(settings.address || '');
  const [bio, setBio] = useState(settings.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(settings.avatar_url || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const supabase = getSupabaseClient();
  const router = useRouter();

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Update user settings
      const { error: updateError } = await supabase
        .from('users')
        .update({
          full_name: name,
          phone,
          address,
          bio,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (updateError) {
        console.error('Update Settings Error:', updateError);
        setError('Fehler beim Aktualisieren der Settings: ' + updateError.message);
        setLoading(false);
        return;
      }

      // Show success toast
      // Toast.success('Settings aktualisiert!');

      router.refresh();
    } catch (err) {
      console.error('Update Settings Error:', err);
      setError('Ein Fehler ist aufgetreten! Bitte versuche es später erneut.');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdateSettings} className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Vollständiger Name</Label>
        <Input
          id="name"
          placeholder="Dein vollständiger Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">E-Mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="deine@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          disabled
        />
        <p className="text-xs text-muted-foreground">
          Die E-Mail kann nicht geändert werden. Bitte kontaktiere den Support.
        </p>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">Telefonnummer</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+49 123 456 7890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address">Adresse</Label>
        <Textarea
          id="address"
          placeholder="Deine Adresse"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={2}
          className="w-full"
        />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">Über mich</Label>
        <Textarea
          id="bio"
          placeholder="Erzähle etwas über dich..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          className="w-full"
        />
      </div>

      {/* Avatar URL */}
      <div className="space-y-2">
        <Label htmlFor="avatar">Avatar URL</Label>
        <Input
          id="avatar"
          type="url"
          placeholder="https://example.com/avatar.jpg"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">
          Lade ein Bild hoch und füge die URL hier ein.
        </p>
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
          {loading ? 'Wird gespeichert...' : '💾 Speichern'}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="text-muted-foreground hover:text-foreground"
          onClick={() => router.back()}
        >
          Abbrechen
        </Button>
      </div>
    </form>
  );
}

function DangerAction({ title, description, buttonText, buttonVariant }: { title: string; description: string; buttonText: string; buttonVariant?: 'default' | 'destructive' }) {
  const [loading, setLoading] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [error, setError] = useState('');
  const supabase = getSupabaseClient();
  const router = useRouter();

  const handleAction = async () => {
    setError('');
    setLoading(true);

    try {
      // Handle different actions based on button text
      if (buttonText === 'Alle Listings löschen') {
        // Delete all listings
        const { error: deleteListingsError } = await supabase
          .from('listings')
          .delete()
          .neq('id', null);

        if (deleteListingsError) {
          throw new Error('Fehler beim Löschen der Listings: ' + deleteListingsError.message);
        }

        // Reset confirm text
        setConfirmText('');
      } else if (buttonText === 'Store löschen') {
        // Delete store (will cascade delete listings)
        // This is just a placeholder - we'd need to implement store deletion logic
        console.log('Store löschen - Placeholder');
      } else if (buttonText === 'Account löschen') {
        // Delete user account
        // This is just a placeholder - we'd need to implement user deletion logic
        console.log('Account löschen - Placeholder');
      }

      // Success
      router.refresh();
    } catch (err) {
      console.error('Danger Action Error:', err);
      setError('Ein Fehler ist aufgetreten! Bitte versuche es später erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg hover:border-red-200 transition-colors">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      {confirmText !== buttonText && (
        <div className="space-y-2">
          <Input
            type="text"
            placeholder={`Tippe "${buttonText}" um zu bestätigen`}
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full"
          />
          <Button
            variant={buttonVariant}
            className="w-full"
            onClick={handleAction}
            disabled={loading || confirmText !== buttonText}
          >
            {loading ? 'Wird ausgeführt...' : buttonText}
          </Button>
        </div>
      )}
      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
          <p className="text-sm">❌ {error}</p>
        </div>
      )}
    </div>
  );
}

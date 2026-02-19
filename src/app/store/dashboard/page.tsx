---
import { getSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAuth } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default async function StoreDashboardPage() {
  const supabase = getSupabaseClient();

  // Fetch user's store
  const { data: user } = await getAuth();
  const userId = user?.id;

  let store = null;
  let listings = [];

  if (userId) {
    // Fetch store
    const { data: storeData } = await supabase
      .from('stores')
      .select('*')
      .eq('created_by', userId)
      .single();

    store = storeData;

    // Fetch listings
    if (store) {
      const { data: listingsData } = await supabase
        .from('listings')
        .select('*')
        .eq('store_id', store.id)
        .order('created_at', { ascending: false });

      listings = listingsData || [];
    }
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
            <div className="flex items-center gap-4">
              {store ? (
                <Link
                  href="/store/create"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Neuen Store erstellen
                </Link>
              ) : null}
              <Link
                href="/store/create"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                🏪 Store erstellen
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {store ? (
          <div className="max-w-7xl mx-auto">
            {/* Store Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                {store.name}
              </h1>
              <p className="text-lg text-muted-foreground">
                3uck.store/{store.slug}
              </p>
            </div>

            {/* Store Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="💼 Listings"
                value={listings.length}
                description="Insgesamt"
              />
              <StatCard
                title="👀 Aufrufe"
                value="0"
                description="Letzte 7 Tage"
              />
              <StatCard
                title="💰 Umsatz"
                value="€0"
                description="Diesen Monat"
              />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <ActionCard
                title="📝 Neues Listing"
                description="Erstelle ein neues 3D-Druck-Modell oder Print"
                href="/listings/create"
              />
              <ActionCard
                title="⚙️ Store-Einstellungen"
                description="Bearbeite Name, Slug, Beschreibung, etc."
                href="/store/settings"
              />
              <ActionCard
                title="📊 Analytics"
                description="Ansichten, Verkäufe, Umsatz und andere Statistiken"
                href="/store/analytics"
              />
              <ActionCard
                title="👥 Kunden verwalten"
                description="Bestellungen, Refunds, Kundensupport"
                href="/store/orders"
              />
            </div>

            {/* Listings Table */}
            <Card className="border rounded-xl bg-white shadow-lg">
              <CardHeader>
                <CardTitle>📋 Listings</CardTitle>
                <CardDescription>
                  Alle deine 3D-Druck-Modelle und Prints
                </CardDescription>
              </CardHeader>
              <CardContent>
                {listings.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4 font-medium">Titel</th>
                          <th className="text-left p-4 font-medium">Kategorie</th>
                          <th className="text-left p-4 font-medium">Preis</th>
                          <th className="text-left p-4 font-medium">Status</th>
                          <th className="text-left p-4 font-medium">Aktionen</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listings.map((listing) => (
                          <tr key={listing.id} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-medium">{listing.title}</td>
                            <td className="p-4">{listing.category_id}</td>
                            <td className="p-4">{listing.price ? `€${listing.price}` : '-'}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                listing.status === 'published' ? 'bg-green-100 text-green-700' :
                                listing.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {listing.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Link
                                  href={`/listings/${listing.id}`}
                                  className="text-sm text-blue-600 hover:text-blue-700"
                                >
                                  Bearbeiten
                                </Link>
                                <Link
                                  href={`/listings/${listing.id}`}
                                  className="text-sm text-blue-600 hover:text-blue-700"
                                >
                                  Vorschau
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      Du hast noch keine Listings.
                    </p>
                    <Button
                      onClick={() => router.push('/listings/create')}
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      📝 Erstes Listing erstellen
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          // No store yet
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              🏪 Store erstellen
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Starte deinen 3D-Druck-Modelle & Prints Business
            </p>
            <Button
              onClick={() => router.push('/store/create')}
              className="px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 text-lg"
            >
              🚀 Jetzt starten
            </Button>
            <div className="mt-8 p-6 bg-white rounded-xl border">
              <h2 className="text-2xl font-bold mb-4">💡 Warum einen Store erstellen?</h2>
              <ul className="space-y-2 text-left text-lg">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">✅</span>
                  <span>Eigene Store-Seite mit deinem Brand</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">✅</span>
                  <span>3D-Modelle & Prints verkaufen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">✅</span>
                  <span>Analytics Dashboard für Umsatz & Verkäufe</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">✅</span>
                  <span>Revenue Share für deine Designs</span>
                </li>
              </ul>
            </div>
          </div>
        )}
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

function StatCard({ title, value, description }: { title: string; value: string | number; description: string }) {
  return (
    <Card className="border rounded-xl p-6 bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-2">{value}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function ActionCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Card className="border rounded-xl p-6 bg-white hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Link
          href={href}
          className="inline-block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Loslegen →
        </Link>
      </CardContent>
    </Card>
  );
}

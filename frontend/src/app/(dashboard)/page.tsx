import { TorchChart } from "@/components/chats";
import { TorchTables } from "@/components/torch-tables";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-full space-y-4">
      <TorchChart />
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-5 xl:grid-cols-6">
        <TorchTables className="col-span-1 lg:col-span-4 xl:col-span-5" />
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Torch Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 [&>*]:w-full">
              {/* TODO:  Implements onClicks0 */}
              <Button type="button" size="default" variant="default">
                Start | Stop
              </Button>
              <Button type="button" size="default" variant="default">
                Reset Zoom
              </Button>
              <Button type="button" size="default" variant="default">
                Clear Data History
              </Button>
              <Button type="button" size="default" variant="default">
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

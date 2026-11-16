import { Link } from "@tanstack/react-router";
import { DIRECTORY_DATA } from "../../data/directory-data";

export function DirectoryListing() {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono px-6 py-24 sm:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <h1 className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Index of /private/vault
          </h1>
          <div className="h-px w-full bg-border" />
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-muted-foreground border-b border-border/50">
                <th className="font-normal py-4 pr-8">Permissions</th>
                <th className="font-normal py-4 pr-8">Size</th>
                <th className="font-normal py-4 pr-8">Date Modified</th>
                <th className="font-normal py-4">Name</th>
              </tr>
            </thead>
            <tbody>
              {/* Parent Directory Link */}
              <tr className="group border-b border-border/10 hover:bg-foreground/[0.02] transition-colors">
                <td className="py-4 pr-8 text-muted-foreground opacity-60">drwxr-xr-x</td>
                <td className="py-4 pr-8 text-muted-foreground opacity-60">-</td>
                <td className="py-4 pr-8 text-muted-foreground opacity-60">-</td>
                <td className="py-4">
                  <Link to="/" className="text-foreground hover:underline decoration-foreground/30 underline-offset-4">
                    ../ (Parent Directory)
                  </Link>
                </td>
              </tr>
              
              {/* Files */}
              {DIRECTORY_DATA.map((file) => (
                <tr key={file.slug} className="group border-b border-border/10 hover:bg-foreground/[0.02] transition-colors">
                  <td className="py-4 pr-8 text-muted-foreground opacity-60">{file.permissions}</td>
                  <td className="py-4 pr-8 text-muted-foreground opacity-60">{file.size}</td>
                  <td className="py-4 pr-8 text-muted-foreground opacity-60">{file.date}</td>
                  <td className="py-4">
                    <Link 
                      to="/dir/$slug" 
                      params={{ slug: file.slug }}
                      className="text-foreground hover:underline decoration-foreground/30 underline-offset-4 transition-all"
                    >
                      {file.filename}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

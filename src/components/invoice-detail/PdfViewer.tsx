
import { useEffect, useRef, useState } from "react";

interface PdfViewerProps {
  url: string;
}

export function PdfViewer({ url }: PdfViewerProps) {
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = () => {
        setLoading(false);
      };
    }
  }, []);

  return (
    <div className="h-full flex flex-col rounded-md border overflow-hidden">
      {loading && (
        <div className="flex-1 flex items-center justify-center bg-muted/20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading PDF...</p>
          </div>
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        src={url}
        className="w-full flex-1"
        title="PDF Viewer"
        style={{ display: loading ? 'none' : 'block' }}
      />
    </div>
  );
}

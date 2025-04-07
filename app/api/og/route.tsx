import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';
 
export const runtime = 'edge';
 
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // ?title=<title>
    const title = searchParams.get('title') || 'Leo\'s Portfolio';
    
    // ?description=<description>
    const description = searchParams.get('description') || 'Software Engineer & Computer Science Student';
    
    // ?theme=<theme>
    const theme = searchParams.get('theme') || 'light';
    
    const backgroundColor = theme === 'dark' ? '#141414' : '#FFFFFF';
    const textColor = theme === 'dark' ? '#FFFFFF' : '#141414';
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor,
            padding: '40px',
            fontFamily: 'Geist, sans-serif',
            position: 'relative',
          }}
        >
          {/* Background pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              opacity: 0.1,
              backgroundImage: `radial-gradient(circle at 25px 25px, ${theme === 'dark' ? '#ffffff' : '#000000'} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${theme === 'dark' ? '#ffffff' : '#000000'} 2%, transparent 0%)`,
              backgroundSize: '100px 100px',
            }}
          />
          
          <div
            style={{
              marginBottom: '20px',
              fontSize: '28px',
              fontWeight: 500,
              color: theme === 'dark' ? '#888888' : '#666666',
            }}
          >
            Portfolio
          </div>
          
          <div
            style={{
              fontSize: '68px',
              fontWeight: 700,
              color: textColor,
              lineHeight: 1.2,
              marginBottom: '20px',
              maxWidth: '800px',
            }}
          >
            {title}
          </div>
          
          <div
            style={{
              fontSize: '32px',
              color: theme === 'dark' ? '#AAAAAA' : '#555555',
            }}
          >
            {description}
          </div>
          
          {/* Bottom signature - 洗練されたLアイコン */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                background: `linear-gradient(135deg, ${theme === 'dark' ? '#8B7FFF' : '#7B68EE'}, ${theme === 'dark' ? '#6A5ACD' : '#483D8B'})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '24px',
                boxShadow: theme === 'dark' ? 
                  '0 2px 8px rgba(255, 255, 255, 0.15)' : 
                  '0 2px 8px rgba(0, 0, 0, 0.15)',
              }}
            >
              L
            </div>
            <div style={{ color: textColor, fontSize: '24px', fontWeight: 600 }}>
              Leo
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000, immutable'
        },
      },
    );
  } catch (e) {
    console.log(`${e instanceof Error ? e.message : 'Unknown error occurred'}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

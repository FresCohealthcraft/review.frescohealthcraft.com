import React, { useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Printer, ArrowLeft, Copy, Check, MessageCircle, Globe, Instagram } from 'lucide-react';
import { BRAND, DEPLOYED_SITE_URL } from '../types';
import { copyTextToClipboard } from '../utils/clipboard';
import frescoLogoImg from '../assets/images/fresco_logo_emblem_1791257186646.jpg';
import botanicalLeavesImg from '../assets/images/botanical_leaves_border_1791257212534.jpg';

interface QRCodeSectionProps {
  onBack: () => void;
}

export const QRCodeSection: React.FC<QRCodeSectionProps> = ({ onBack }) => {
  const [targetUrl, setTargetUrl] = useState<string>(DEPLOYED_SITE_URL);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const qrRef = useRef<HTMLDivElement>(null);

  // Copy target URL
  const handleCopyUrl = async () => {
    const success = await copyTextToClipboard(targetUrl);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Print Standee
  const handlePrint = () => {
    window.print();
  };

  // Helper to load image for canvas drawing
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  // Generate and download high-resolution PNG (1500x2000 px, matching 1791255104258.png exactly)
  const handleDownloadHighResPNG = async () => {
    setIsDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      const width = 1500;
      const height = 2000;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      // 1. Solid pure white background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // 2. Draw photorealistic botanical leaves frame in corners
      try {
        const leaves = await loadImage(botanicalLeavesImg);
        ctx.drawImage(leaves, 0, 0, width, height);
      } catch (e) {
        console.warn('Leaves image fallback:', e);
      }

      // 3. Draw top official logo emblem
      try {
        const logo = await loadImage(frescoLogoImg);
        const logoSize = 340;
        const logoX = (width - logoSize) / 2;
        const logoY = 110;
        
        // Circular clip for clean emblem
        ctx.save();
        ctx.beginPath();
        ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
        ctx.restore();
      } catch (e) {
        console.warn('Logo image fallback:', e);
      }

      // 4. Standee Card Box (with deep green rounded border matching 1791255104258.png)
      const cardX = 170;
      const cardY = 500;
      const cardW = width - 340;
      const cardH = 1350;
      const cardR = 48;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.98)';
      ctx.strokeStyle = '#225232';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, cardR);
      ctx.fill();
      ctx.stroke();

      // "Scan to leave a"
      ctx.textAlign = 'center';
      ctx.fillStyle = '#374151';
      ctx.font = '500 44px Poppins, sans-serif';
      ctx.fillText('Scan to leave a', width / 2, cardY + 110);

      // "˗ˋˏ Google review ˎˊ˗"
      const googleLetters = [
        { char: 'G', color: '#4285F4' },
        { char: 'o', color: '#EA4335' },
        { char: 'o', color: '#FBBC05' },
        { char: 'g', color: '#4285F4' },
        { char: 'l', color: '#34A853' },
        { char: 'e', color: '#EA4335' },
      ];
      ctx.font = 'bold 88px Poppins, sans-serif';
      const letterWidths = googleLetters.map((l) => ctx.measureText(l.char).width);
      const totalGoogleWidth = letterWidths.reduce((a, b) => a + b, 0);

      ctx.fillStyle = '#225232';
      ctx.font = '500 62px Poppins, sans-serif';
      const reviewWidth = ctx.measureText(' review').width;
      const fullLogoWidth = totalGoogleWidth + reviewWidth + 140;

      let startX = (width - fullLogoWidth) / 2 + 70;

      // Left radiant sparkles
      ctx.fillStyle = '#225232';
      ctx.font = 'bold 44px sans-serif';
      ctx.fillText('˗ˋˏ ', startX - 55, cardY + 220);

      // Google letters
      ctx.font = 'bold 88px Poppins, sans-serif';
      googleLetters.forEach((l, idx) => {
        ctx.fillStyle = l.color;
        ctx.textAlign = 'left';
        ctx.fillText(l.char, startX, cardY + 220);
        startX += letterWidths[idx];
      });

      // " review ˎˊ˗"
      ctx.fillStyle = '#225232';
      ctx.font = '500 62px Poppins, sans-serif';
      ctx.fillText(' review ˎˊ˗', startX + 10, cardY + 220);

      // 5. Handwritten Doodles: "Scan Here ⤷" and "⤶ Share Your Experience ♡"
      ctx.fillStyle = '#225232';
      ctx.font = 'bold 50px Caveat, cursive, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Scan Here', cardX + 130, cardY + 470);
      ctx.fillText('⤷', cardX + 130, cardY + 520);

      ctx.fillText('Share Your', cardX + cardW - 140, cardY + 470);
      ctx.fillText('Experience', cardX + cardW - 140, cardY + 520);
      ctx.fillText('♡', cardX + cardW - 140, cardY + 570);

      // 6. Center QR Code Container with green border
      const qrCanvasSource = qrRef.current?.querySelector('canvas');
      const qrSize = 540;
      const qrX = (width - qrSize) / 2;
      const qrY = cardY + 360;

      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#225232';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.roundRect(qrX - 25, qrY - 25, qrSize + 50, qrSize + 50, 32);
      ctx.fill();
      ctx.stroke();

      if (qrCanvasSource) {
        ctx.drawImage(qrCanvasSource, qrX, qrY, qrSize, qrSize);
      }

      // 7. Subtitle text below QR
      ctx.textAlign = 'center';
      ctx.fillStyle = '#374151';
      ctx.font = '500 32px Poppins, sans-serif';
      ctx.fillText('Your feedback helps us serve you better', width / 2, cardY + 1010);
      ctx.fillText('and keeps our wellness journey going!', width / 2, cardY + 1060);

      // 8. 5 Gold Stars with radiance
      ctx.fillStyle = '#F59E0B';
      ctx.font = '66px Poppins, sans-serif';
      ctx.fillText('˗ˋˏ ★ ★ ★ ★ ★ ˎˊ˗', width / 2, cardY + 1160);

      // 9. Bottom Divider line
      ctx.strokeStyle = '#D1D5DB';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cardX + 60, cardY + 1230);
      ctx.lineTo(cardX + cardW - 60, cardY + 1230);
      ctx.stroke();

      // 10. Contact Info Row
      ctx.fillStyle = '#225232';
      ctx.font = '600 28px Poppins, sans-serif';
      ctx.fillText(
        `✆ ${BRAND.phone}   |   🌐 ${BRAND.website}   |   📷 @${BRAND.instagram}`,
        width / 2,
        cardY + 1295
      );

      // Download file
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `${BRAND.name.toLowerCase().replace(/\s+/g, '-')}-google-review-standee-1500x2000.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      console.error('QR download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-[460px] mx-auto min-h-screen flex flex-col justify-between p-4 font-sans bg-[#FAF9F5] text-stone-900 printable-qr-card-container relative overflow-hidden">
      {/* Top Header Bar (Hidden during print) */}
      <div className="no-print flex items-center justify-between py-2 border-b border-stone-200/90 mb-3 relative z-20">
        <button
          onClick={onBack}
          type="button"
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 px-2 py-1.5 rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Reviews</span>
        </button>

        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
          Print Standee Card
        </span>
      </div>

      {/* Main Standee Wrapper (Matching 1791255104258.png Exactly) */}
      <div className="my-auto py-2 flex flex-col items-center w-full relative z-10">
        {/* Printable Standee Card with Photorealistic Botanical Leaves Frame */}
        <div className="printable-qr-card w-full max-w-[390px] bg-white rounded-[32px] pt-6 pb-5 px-5 shadow-2xl border border-stone-200/90 text-center flex flex-col items-center relative overflow-hidden">
          {/* Photorealistic Botanical Green Leaves in all 4 Corners (from generated asset) */}
          <img
            src={botanicalLeavesImg}
            alt="Botanical Tea Leaves Background"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0 opacity-95"
          />

          {/* Top Authentic Logo Emblem (Matching IMG_20260929_050028_681.webp) */}
          <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 mb-1 drop-shadow-sm flex items-center justify-center">
            <img
              src={frescoLogoImg}
              alt="Fresco Healthcraft Official Logo"
              className="w-full h-full object-contain rounded-full bg-white shadow-xs"
            />
          </div>

          {/* Standee Inner Card with Deep Green Rounded Border */}
          <div className="w-full mt-2 rounded-[26px] border-2 border-[#225232] bg-white/95 backdrop-blur-xs p-4 flex flex-col items-center shadow-xs relative z-10">
            {/* Header: Scan to leave a Google review */}
            <p className="text-xs font-medium text-stone-700 tracking-wide">
              Scan to leave a
            </p>

            <div className="flex items-center justify-center gap-1 my-0.5 leading-none">
              <span className="text-[#225232] text-xs font-handwriting">˗ˋˏ</span>
              <div className="font-display font-bold text-2xl sm:text-[26px] tracking-normal select-none flex items-center">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </div>
              <span className="font-display font-medium text-[#225232] text-xl sm:text-2xl ml-1">
                review
              </span>
              <span className="text-[#225232] text-xs font-handwriting">ˎˊ˗</span>
            </div>

            {/* Doodles + QR Code Container */}
            <div className="w-full relative my-2 flex items-center justify-center min-h-[175px]">
              {/* Left doodle: Scan Here ⤷ */}
              <div className="absolute left-1 sm:left-2 top-3 flex flex-col items-center text-[#225232] select-none">
                <span className="font-handwriting font-bold text-sm sm:text-base leading-tight text-center">
                  Scan<br />Here
                </span>
                <span className="text-lg rotate-45 mt-0.5 leading-none">⤷</span>
              </div>

              {/* Center QR Code in green rounded box */}
              <div
                ref={qrRef}
                className="p-2.5 bg-white rounded-2xl border-2 border-[#225232] shadow-xs flex items-center justify-center"
              >
                <QRCodeCanvas
                  value={targetUrl}
                  size={145}
                  level="H"
                  marginSize={1}
                  fgColor="#111827"
                  bgColor="#FFFFFF"
                />
              </div>

              {/* Right doodle: Share Your Experience ♡ ⤶ */}
              <div className="absolute right-1 sm:right-2 top-2 flex flex-col items-center text-[#225232] select-none max-w-[65px]">
                <span className="font-handwriting font-bold text-xs sm:text-sm leading-tight text-center">
                  Share Your<br />Experience
                </span>
                <span className="font-handwriting text-sm text-[#225232] mt-0.5">♡</span>
                <span className="text-lg -rotate-45 leading-none">⤶</span>
              </div>
            </div>

            {/* Subtext below QR */}
            <p className="text-[11px] sm:text-xs text-stone-700 font-medium max-w-[260px] text-center leading-snug">
              Your feedback helps us serve you better and keeps our wellness journey going!
            </p>

            {/* 5 Golden Stars with green sparkles */}
            <div className="flex items-center justify-center gap-1.5 text-amber-400 text-lg sm:text-xl my-1.5 leading-none">
              <span className="text-[#225232] text-xs font-handwriting">˗ˋˏ</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span className="text-[#225232] text-xs font-handwriting">ˎˊ˗</span>
            </div>

            {/* Contact Bar with Divider Line */}
            <div className="w-full border-t border-stone-200/90 mt-1.5 pt-2 flex items-center justify-between text-[10px] sm:text-[11px] text-stone-800 font-medium">
              <div className="flex items-center gap-1 text-[#225232]">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-700 stroke-[2.2]" />
                <span>{BRAND.phone}</span>
              </div>
              <div className="flex items-center gap-1 text-[#225232]">
                <Globe className="w-3.5 h-3.5 text-emerald-700 stroke-[2.2]" />
                <span>{BRAND.website}</span>
              </div>
              <div className="flex items-center gap-1 text-[#225232]">
                <Instagram className="w-3.5 h-3.5 text-emerald-700 stroke-[2.2]" />
                <span>{BRAND.instagram}</span>
              </div>
            </div>
          </div>
        </div>

        {/* URL Configuration Input Box (Hidden during print) */}
        <div className="no-print w-full max-w-[390px] mt-4 p-3 bg-stone-100/90 rounded-2xl border border-stone-200 text-left relative z-10">
          <label className="block text-[10px] font-semibold text-stone-600 uppercase tracking-wider mb-1">
            Configured QR URL (Always points to deployed domain)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="flex-1 bg-white border border-stone-300 rounded-lg px-2.5 py-1 text-xs font-mono text-stone-800 focus:outline-[#225232]"
              placeholder="https://review.frescohealthcraft.com"
            />
            <button
              onClick={handleCopyUrl}
              type="button"
              className="min-h-[30px] px-2.5 py-1 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg text-xs font-medium text-stone-700 flex items-center gap-1 cursor-pointer"
              title="Copy URL"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          {targetUrl !== DEPLOYED_SITE_URL && (
            <button
              onClick={() => setTargetUrl(DEPLOYED_SITE_URL)}
              type="button"
              className="text-[10px] text-emerald-700 hover:underline mt-1 block cursor-pointer"
            >
              Reset to default ({DEPLOYED_SITE_URL})
            </button>
          )}
        </div>
      </div>

      {/* Action Zone: 2 Buttons "Download PNG" & "Print Standee" (Hidden during print) */}
      <div className="no-print space-y-2 pt-2 pb-2 border-t border-stone-200 w-full max-w-[390px] mx-auto relative z-10">
        <div className="grid grid-cols-2 gap-2">
          {/* Button 1: Download PNG (1500x2000 px) */}
          <button
            onClick={handleDownloadHighResPNG}
            disabled={isDownloading}
            type="button"
            className="min-h-[46px] py-2 px-3 rounded-xl bg-[#185333] hover:bg-[#124227] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloading ? 'Generating...' : 'Download PNG'}</span>
          </button>

          {/* Button 2: Print */}
          <button
            onClick={handlePrint}
            type="button"
            className="min-h-[46px] py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 active:scale-[0.99] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Standee</span>
          </button>
        </div>

        <button
          onClick={onBack}
          type="button"
          className="w-full py-1 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors text-center cursor-pointer"
        >
          ← Return to Review Page
        </button>
      </div>
    </div>
  );
};

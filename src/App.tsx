// @ts-nocheck
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Building2,
  ShoppingBag,
  QrCode,
  CreditCard,
  Cpu,
  MapPin,
  Search,
  Filter,
  Download,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Send,
  Bot,
  RefreshCw,
  FileText,
  Users,
  Sprout,
  Compass,
  Calendar,
  Layers,
  Activity,
  Award,
  Zap,
  HelpCircle,
  X,
  Upload,
  Globe,
  Database,
  ArrowRight,
  ChevronDown,
  Play,
  Pause,
  Smartphone,
  ShieldCheck,
  BookOpen,
  HeartPulse,
  Volume2,
  VolumeX,
  Copy,
} from 'lucide-react';

// Static Zone Coordinates & Info for Đặc khu Kiên Hải (Declared in Global Scope to prevent TDZ Reference Errors)
const KIENHAI_ZONES = [
  {
    id: 'hon-tre',
    name: 'Đảo Hòn Tre',
    dei: 82,
    status: 'Rất cao',
    color: '#22C55E',
    desc: 'Trung tâm hành chính Đặc khu • Trọng điểm số hóa doanh nghiệp lữ hành du lịch.',
    enterprises: 95,
    cloud: 3,
    erp: 2,
  },
  {
    id: 'lai-son',
    name: 'Đảo Lại Sơn',
    dei: 64,
    status: 'Khá',
    color: '#10B981',
    desc: 'Vùng sản xuất đặc sản nước mắm OCOP truyền thống ứng dụng định danh số QR.',
    enterprises: 65,
    cloud: 1,
    erp: 1,
  },
  {
    id: 'an-son',
    name: 'Quần đảo An Sơn',
    dei: 41,
    status: 'Thấp',
    color: '#EF4444',
    desc: 'Vùng đánh bắt thủy sản xa xôi • Đang thử nghiệm phổ cập Nhật ký khai thác Blockchain.',
    enterprises: 30,
    cloud: 0,
    erp: 0,
  },
  {
    id: 'nam-du',
    name: 'Quần đảo Nam Du',
    dei: 58,
    status: 'Trung bình',
    color: '#F59E0B',
    desc: 'Thiên đường du lịch lữ hành đảo • Đang số hóa hạ tầng thanh toán không tiền mặt.',
    enterprises: 21,
    cloud: 0,
    erp: 1,
  },
];

// Initial Parallel Database containing BOTH layers fully synced with documents
const INITIAL_PERIODIC_DATA = {
  'T12/2025': {
    id: 'T12/2025',
    label: 'Tháng 12 / 2025',
    quarter: 'Q4/2025',
    year: '2025',
    // TẦNG 1: Tiêu chí Chuẩn 2.0 (B1 -> B8)
    layer1: {
      deiScore: 68,
      // B1: Doanh nghiệp số
      b1: { total: 480, active: 280, cloud: 120, erp: 60, ai: 30 },
      // B2: OCOP & Đặc sản
      b2: { total: 140, active: 110, ecom: 90, qr: 70, export: 8 },
      // B3: TMĐT
      b3: {
        revenue: 6.2,
        orders: 5400,
        repeatRatio: 45,
        newCustomers: 1800,
        averageValue: 0.95,
      },
      // B4: Thanh toán số
      b4: { ratio: 55, qrPay: 40, mobileBank: 35, eWallet: 15, pos: 10 },
      // B5: Hộ kinh doanh số
      b5: { total: 1100, active: 380, levels: [380, 240, 180, 90, 40] },
      // B6: Du lịch số
      b6: { ratio: 58, onlineGuests: 12000, revenue: 2.8 },
      // B7: Nông nghiệp số
      b7: { farmRatio: 65, qrTrace: 50, iotFarm: 35, ecomAgri: 48 },
      // B8: Khởi nghiệp & ĐMST
      b8: { startups: 18, projects: 6, mentors: 20, investors: 8 },
    },
    // TẦNG 2: Bộ tiêu chí mở rộng từ PDF (A -> E)
    layer2: {
      nhomA: {
        digitalEnterprises: 95,
        cloudEnterprises: 2,
        comprehensiveDigital: 1,
        netIdCards: 0,
      },
      nhomB: { digitalProducts: 2, ecomOrders: 15, growthRate: 10 },
      nhomC: { erpSystems: 1, totalPersonnel: 3500, trainingCourses: 1 },
      nhomD: {
        pageViews: 12000,
        viewers: 2100,
        googleSeo: 950000,
        customers: 1800,
        revenue: 45,
      },
      nhomE: {
        enterprises: 180,
        charityProjects: 4,
        boardNews: 45,
        projects: 4,
        investmentCalls: 5,
        tourismLocations: 4,
        featuredEvents: 3,
        digitalTransformations: 1,
        libraryDocs: 2,
      },
    },
  },
  'T05/2026': {
    // PDF Document Base + Chuẩn 2.0 (Bám sát tài liệu & PDF)
    id: 'T05/2026',
    label: 'Tháng 05 / 2026',
    quarter: 'Q2/2026',
    year: '2026',
    // TẦNG 1: Tiêu chí Chuẩn 2.0 (B1 -> B8 bám sát word doc)
    layer1: {
      deiScore: 76,
      // B1: Doanh nghiệp số
      b1: { total: 520, active: 318, cloud: 165, erp: 97, ai: 56 },
      // B2: OCOP & Đặc sản
      b2: { total: 152, active: 131, ecom: 118, qr: 96, export: 18 },
      // B3: TMĐT
      b3: {
        revenue: 8.5,
        orders: 8420,
        repeatRatio: 54,
        newCustomers: 3256,
        averageValue: 1.01,
      },
      // B4: Thanh toán không tiền mặt
      b4: { ratio: 68, qrPay: 48, mobileBank: 32, eWallet: 12, pos: 8 },
      // B5: Hộ kinh doanh số
      b5: { total: 1256, active: 486, levels: [486, 326, 244, 136, 64] },
      // B6: Du lịch số
      b6: { ratio: 72, onlineGuests: 18500, revenue: 4.2 },
      // B7: Nông nghiệp số
      b7: { farmRatio: 85, qrTrace: 73, iotFarm: 52, ecomAgri: 67 },
      // B8: Khởi nghiệp & ĐMST
      b8: { startups: 28, projects: 11, mentors: 35, investors: 12 },
    },
    // TẦNG 2: Bộ tiêu chí mở rộng (Khớp 100% dữ liệu PDF)
    layer2: {
      nhomA: {
        digitalEnterprises: 118,
        cloudEnterprises: 4,
        comprehensiveDigital: 4,
        netIdCards: 0,
      },
      nhomB: { digitalProducts: 4, ecomOrders: 43, growthRate: 15 },
      nhomC: { erpSystems: 4, totalPersonnel: 4646, trainingCourses: 0 },
      nhomD: {
        pageViews: 23660,
        viewers: 4646,
        googleSeo: 1532115,
        customers: 4646,
        revenue: 123,
      },
      nhomE: {
        enterprises: 211,
        charityProjects: 6,
        boardNews: 76,
        projects: 6,
        investmentCalls: 8,
        tourismLocations: 6,
        featuredEvents: 7,
        digitalTransformations: 2,
        libraryDocs: 4,
      },
    },
  },
};

export default function App() {
  // Navigation & Global States
  const [activeTab, setActiveTab] = useState('tong-quan');
  const [activeSubAE, setActiveSubAE] = useState('ALL'); // For Layer 2 details (A to E)
  const [selectedPeriod, setSelectedPeriod] = useState('T05/2026'); // Loaded Report period
  const [selectedZone, setSelectedZone] = useState(null); // Map drill-down
  const [isLiveSimulating, setIsLiveSimulating] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  // Gemini AI Loading States & Query State
  const [aiQuery, setAiQuery] = useState('');
  const [aiIsLoading, setAiIsLoading] = useState(false);
  const [isPlayingBriefing, setIsPlayingBriefing] = useState(false);
  const [deepScanResult, setDeepScanResult] = useState('');
  const [showPdfImportModal, setShowPdfImportModal] = useState(false);

  // Policy Generator States
  const [selectedIssue, setSelectedIssue] = useState('nhom-c-training');
  const [generatedPolicy, setGeneratedIssuePolicy] = useState('');
  const [isGeneratingPolicy, setIsGeneratingPolicy] = useState(false);

  // Audio elements references
  const audioRef = useRef(null);

  // Use initialized periodic database
  const [periodicData, setPeriodicData] = useState(INITIAL_PERIODIC_DATA);

  // Simulated real-time incremental offset
  const [simulatedOffset, setSimulatedOffset] = useState({
    ecomOrders: 0,
    pageViews: 0,
    googleSeo: 0,
    revenue: 0,
  });

  // Live Simulator engine setup
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      setSimulatedOffset((prev) => ({
        ecomOrders: prev.ecomOrders + Math.floor(Math.random() * 2),
        pageViews: prev.pageViews + Math.floor(Math.random() * 6) + 2,
        googleSeo: prev.googleSeo + Math.floor(Math.random() * 20) + 5,
        revenue: prev.revenue + parseFloat((Math.random() * 0.1).toFixed(2)),
      }));
    }, 4500);

    return () => clearInterval(interval);
  }, [isLiveSimulating]);

  // Combined Active State
  const activeMetrics = useMemo(() => {
    const raw = periodicData[selectedPeriod] || periodicData['T05/2026'];

    // 1. Tầng 2: Apply simulated live offsets to raw PDF data
    const l2 = {
      ...raw.layer2,
      nhomB: {
        ...raw.layer2.nhomB,
        ecomOrders: raw.layer2.nhomB.ecomOrders + simulatedOffset.ecomOrders,
      },
      nhomD: {
        ...raw.layer2.nhomD,
        pageViews: raw.layer2.nhomD.pageViews + simulatedOffset.pageViews,
        googleSeo: raw.layer2.nhomD.googleSeo + simulatedOffset.googleSeo,
        revenue: parseFloat(
          (raw.layer2.nhomD.revenue + simulatedOffset.revenue).toFixed(2)
        ),
      },
    };

    // 2. Tầng 1: ĐỒNG BỘ TÍNH TOÁN TỪ TẦNG 2 (SỐ LIỆU PDF)
    const b1 = {
      total: Math.floor(l2.nhomE.enterprises * 2.5),
      active: l2.nhomA.digitalEnterprises,
      cloud: l2.nhomA.cloudEnterprises,
      erp: l2.nhomC.erpSystems,
      ai: l2.nhomA.comprehensiveDigital,
    };

    const b2 = {
      ...raw.layer1.b2,
      active: l2.nhomB.digitalProducts * 32,
      ecom: l2.nhomB.digitalProducts * 28,
      qr: l2.nhomB.digitalProducts * 24,
    };

    const b3 = {
      revenue: parseFloat((l2.nhomD.revenue * 0.07).toFixed(2)),
      orders: l2.nhomB.ecomOrders * 195,
      repeatRatio: l2.nhomB.growthRate + 39,
      newCustomers: Math.floor(l2.nhomD.customers * 0.7),
      averageValue: 1.01,
    };

    const b4 = raw.layer1.b4;

    // B5 logic: Phụ thuộc trực tiếp vào Đào tạo (Nhóm C)
    const baseB5Active = raw.id === 'T12/2025' ? 380 : 486;
    const b5Active = baseB5Active + l2.nhomC.trainingCourses * 125;
    const b5 = {
      total: 1256,
      active: b5Active,
      levels: [
        b5Active,
        Math.floor(b5Active * 0.67),
        Math.floor(b5Active * 0.5),
        Math.floor(b5Active * 0.28),
        Math.floor(b5Active * 0.13),
      ],
    };

    const b6 = {
      ...raw.layer1.b6,
      onlineGuests: l2.nhomD.viewers * 4,
      revenue: parseFloat((l2.nhomD.revenue * 0.035).toFixed(2)),
    };

    const b7 = {
      ...raw.layer1.b7,
      iotFarm: l2.nhomE.projects * 8 + 4,
    };

    const b8 = {
      ...raw.layer1.b8,
      startups: l2.nhomE.investmentCalls * 3 + 4,
      projects: l2.nhomE.projects * 2 - 1,
    };

    // Điểm DEI tính từ các trọng số
    const b1Score = (b1.active / b1.total) * 100;
    const b5Score = (b5.active / b5.total) * 100;
    const deiScore = Math.min(Math.floor((b1Score + b5Score) / 2 + 35), 100);

    const simulatedLayer1 = {
      deiScore,
      b1,
      b2,
      b3,
      b4,
      b5,
      b6,
      b7,
      b8,
    };

    return {
      ...raw,
      layer1: simulatedLayer1,
      layer2: l2,
    };
  }, [periodicData, selectedPeriod, simulatedOffset]);

  // AI Dialog Center State
  const [aiChatHistory, setAiChatHistory] = useState([
    {
      role: 'assistant',
      text: 'Xin chào Ban chỉ đạo Đặc khu Kiên Hải! Tôi là Trợ lý AI Điều Hành DECC. Tôi đã đối soát hoàn chỉnh cả 2 Tầng dữ liệu: Tầng 1 (Chuẩn Phường/Xã 2.0 - DEI 76%) và Tầng 2 (Báo cáo PDF - Nhóm A-E). Sẵn sàng đồng hành cùng lãnh đạo để phân tích mâu thuẫn hệ thống và ra quyết định chính xác nhất.',
      timestamp: '07:41',
    },
  ]);

  // Toast trigger
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // WAV Helper functions for PCM16 conversion
  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const convertPCMToWav = (base64Data, sampleRate) => {
    const binaryString = window.atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const buffer = bytes.buffer;
    const wavHeader = new ArrayBuffer(44);
    const view = new DataView(wavHeader);

    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + buffer.byteLength, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // Raw PCM
    view.setUint16(22, 1, true); // Mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true); // byte rate
    view.setUint16(32, 2, true); // block align
    view.setUint16(34, 16, true); // 16-bit
    writeString(view, 36, 'data');
    view.setUint32(40, buffer.byteLength, true);

    const blob = new Blob([wavHeader, buffer], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  };

  // Google Gemini API Text-to-Speech call
  const handlePlayTTS = async (textToSpeak) => {
    if (isPlayingBriefing) {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlayingBriefing(false);
      }
      return;
    }

    setIsPlayingBriefing(true);
    triggerToast(
      'Đang kết nối Google Gemini TTS để tạo thuyết minh bằng giọng nói...'
    );

    const apiKey = '';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;

    // Limit speech segment to 250 characters for immediate delivery speed
    const cleanedText = textToSpeak.replace(/[#*`_-]/g, '').substring(0, 250);

    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Đọc to đoạn tóm tắt báo cáo điều hành Đặc khu Kiên Hải sau bằng tiếng Việt với giọng rõ ràng, trang nghiêm: ${cleanedText}`,
            },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: 'Kore', // Deep stable tone voice for administrative briefings
            },
          },
        },
      },
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('TTS API Error');

      const result = await response.json();
      const inlineData = result.candidates?.[0]?.content?.parts?.find(
        (p) => p.inlineData
      )?.inlineData;

      if (inlineData && inlineData.data) {
        const base64 = inlineData.data;
        const mimeType = inlineData.mimeType;
        let rate = 24000;
        const rateMatch = mimeType.match(/rate=(\d+)/);
        if (rateMatch) rate = parseInt(rateMatch[1]);

        const wavUrl = convertPCMToWav(base64, rate);
        const audio = new Audio(wavUrl);
        audioRef.current = audio;
        audio.play();
        audio.onended = () => setIsPlayingBriefing(false);
      } else {
        throw new Error('No speech returned');
      }
    } catch (err) {
      console.error(err);
      triggerToast(
        'Giọng nói AI đang bận. Đã kích hoạt công cụ tổng hợp giọng nói của trình duyệt làm phương án dự phòng.'
      );

      // Fallback to Web Speech API
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.lang = 'vi-VN';
      utterance.onend = () => setIsPlayingBriefing(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Google Gemini API Parallel AI Scan (Feature 1)
  const handleDeepScan = async () => {
    setAiIsLoading(true);
    setDeepScanResult('');
    triggerToast('Đang kích hoạt quét toàn diện song song Layer 1 & 2...');

    const apiKey = '';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const promptText = `Hãy tiến hành phân tích mâu thuẫn hệ thống đối soát 2 Tầng tại Đặc khu Kiên Hải:
    - Điểm DEI: ${activeMetrics.layer1.deiScore}%
    - Hộ kinh doanh cá thể số hóa: 38%
    - Khóa đào tạo số (Tầng 2): 0 khóa.
    Hãy so sánh sự đối nghịch này và đưa ra 3 khuyến nghị hành động khẩn cấp cho ban chỉ đạo đặc khu.`;

    const payload = {
      contents: [{ parts: [{ text: promptText }] }],
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      const parsedText = json.candidates?.[0]?.content?.parts?.[0]?.text;

      if (parsedText) {
        setDeepScanResult(parsedText);
      } else {
        throw new Error('API Limit');
      }
    } catch (err) {
      // Clean fallback if API times out
      setDeepScanResult(
        `**QUÉT SONG HÀNH HOÀT TẤT - PHÁT HIỆN MÂU THUẪN NHÂN QUẢ**\n\n* **Phát hiện 1**: Có sự lệch pha lớn khi tỷ lệ Smartphone đạt **88%** nhưng mức độ số hóa hộ kinh doanh cá thể chỉ dừng ở **38%**.\n* **Phát hiện 2 (Bản báo cáo PDF)**: Nguyên nhân cốt lõi là do số lượng **Khóa đào tạo chuyển đổi số đạt mức 0**.\n\n**HÀNH ĐỘNG ƯU TIÊN**:\n1. ⚡ Thiết lập khẩn cấp khóa tập huấn số hóa lưu động tại các đảo xa.\n2. ⚡ Đồng bộ thanh toán không tiền mặt tại các chợ hải sản địa bàn.`
      );
    } finally {
      setAiIsLoading(false);
    }
  };

  // Google Gemini API Policy Generator (Feature 2)
  const handleGeneratePolicy = async () => {
    setIsGeneratingPolicy(true);
    setGeneratedIssuePolicy('');
    triggerToast('Đang soạn chỉ thị điều hành tự động...');

    const apiKey = '';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    let topic = '';
    if (selectedIssue === 'nhom-c-training')
      topic =
        'Khắc phục triệt để chỉ số Đào tạo số hóa đang ở mức 0 tại Đặc khu Kiên Hải.';
    else if (selectedIssue === 'nhom-b-cloud')
      topic =
        'Tăng tốc chuyển dịch hạ tầng đám mây (Cloud) cho 211 Doanh nghiệp lữ hành hải đảo.';
    else
      topic =
        'Giải phóng rào cản đưa 1.256 hộ kinh doanh cá thể ứng dụng thanh toán không dùng tiền mặt và số hóa mức 4.';

    const promptText = `Hãy soạn thảo một văn bản Quyết định điều hành hành chính chính thức bằng tiếng Việt, từ Ban Chỉ Đạo Chuyển Đổi Số Đặc Khu Kiên Hải nhằm giải quyết chủ đề sau: "${topic}". Văn bản cần có số quyết định, căn cứ luật, mục tiêu chỉ tiêu cụ thể năm 2026, và phân công nhiệm vụ cụ thể cho từng đảo (Hòn Tre, Lại Sơn, An Sơn, Nam Du). Trả lời ngắn gọn dưới dạng biểu mẫu hành chính mẫu mực.`;

    const payload = {
      contents: [{ parts: [{ text: promptText }] }],
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        setGeneratedIssuePolicy(text);
      } else {
        throw new Error('Failed');
      }
    } catch (err) {
      setGeneratedIssuePolicy(
        `**ỦY BAN NHÂN DÂN ĐẶC KHU KIÊN HẢI**\n**BAN CHỈ ĐẠO CHUYỂN ĐỔI SỐ**\n*Số: 145/QĐ-BCĐCĐS*\n\n*Kiên Hải, ngày 11 tháng 06 năm 2026*\n\n**QUYẾT ĐỊNH**\n*V/v Ban hành kế hoạch khẩn cấp khắc phục điểm nghẽn đào tạo nguồn lực số tại Đặc khu.*\n\n* Căn cứ Luật Tổ chức chính quyền địa phương;\n* Căn cứ Bộ tiêu chí Chuyển đổi số Phường/Xã 2.0 Quốc gia;\n\n**QUYẾT ĐỊNH:**\n\n**Điều 1.** Triển khai ngay Chiến dịch "Phổ cập kỹ năng số đảo xa" trong Quý 2/2026. Mục tiêu tổ chức tối thiểu 05 khóa đào tạo số hóa cho Hộ kinh doanh cá thể tại Đảo Lại Sơn, An Sơn và Nam Du.\n**Điều 2.** Giao phòng Kinh tế phối hợp cùng Tổ công nghệ số cộng đồng hướng dẫn người dân mở tài khoản ngân hàng số và dán mã QR thanh toán không tiền mặt.\n**Điều 3.** Quyết định có hiệu lực kể từ ngày ký.`
      );
    } finally {
      setIsGeneratingPolicy(false);
    }
  };

  // Copy to Clipboard Utility
  const handleCopyClipboard = (textToCopy) => {
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = textToCopy;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    triggerToast(
      'Đã sao chép văn bản dự thảo chỉ thị vào clipboard thành công!'
    );
  };

  const handleImportNewPeriod = () => {
    setSelectedPeriod('T05/2026');
    setShowPdfImportModal(false);
    triggerToast('Đã cập nhật lại lịch sử báo cáo PDF song song thành công.');
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-white font-sans antialiased selection:bg-cyan-500 selection:text-white flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="bg-[#0A2540] border-b border-cyan-500/20 px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between sticky top-0 z-40 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#00C2FF] p-2.5 rounded-xl">
            <Cpu className="h-6 w-6 text-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>{' '}
                ĐẶC KHU KIÊN HẢI - DECC COCKPIT
              </span>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full font-bold">
                Mô hình Song song Quốc gia & PDF
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-100 to-[#00C2FF] bg-clip-text text-transparent">
              DIGITAL ECONOMY COMMAND CENTER
            </h1>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-semibold">
              Báo cáo:
            </span>
            <select
              value={selectedPeriod}
              onChange={(e) => {
                setSelectedPeriod(e.target.value);
                setSimulatedOffset({
                  ecomOrders: 0,
                  pageViews: 0,
                  googleSeo: 0,
                  revenue: 0,
                  b3Revenue: 0,
                  b3Orders: 0,
                });
                triggerToast(
                  `Đồng bộ dữ liệu chu kỳ báo cáo ${
                    periodicData[e.target.value]?.label
                  }`
                );
              }}
              className="bg-[#122A4E] border border-cyan-500/30 rounded-lg px-2.5 py-1.5 text-xs font-bold text-cyan-100 outline-none cursor-pointer hover:border-cyan-400 transition-colors"
            >
              {Object.keys(periodicData).map((key) => (
                <option key={key} value={key}>
                  {periodicData[key].label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              setShowPdfImportModal(true);
              triggerToast('Cổng nạp dữ liệu song hành định kỳ đang sẵn sàng.');
            }}
            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Nạp PDF định kỳ</span>
          </button>

          <button
            onClick={() => {
              setIsLiveSimulating(!isLiveSimulating);
              triggerToast(
                isLiveSimulating
                  ? 'Tạm dừng dòng dữ liệu mô phỏng.'
                  : 'Khởi chạy luồng dữ liệu mô phỏng.'
              );
            }}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              isLiveSimulating
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {isLiveSimulating ? (
              <Pause className="h-3 w-3" />
            ) : (
              <Play className="h-3 w-3" />
            )}
            <span>{isLiveSimulating ? 'SIMULATOR ON' : 'OFF'}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Side Navigation Menu (Incorporates "Đặc khu: ..." sub-info beautifully) */}
        <aside className="w-full lg:w-72 bg-[#091B30] border-b lg:border-b-0 lg:border-r border-cyan-500/10 p-4 flex flex-col gap-1.5">
          <div className="text-[10px] font-bold text-cyan-500/60 uppercase px-3 tracking-wider mb-1 flex items-center justify-between">
            <span>BẢN ĐỒ PHÂN KHU ĐẶC KHU</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          </div>

          {/* New Relocated Elegant Region Badge Widget */}
          <div className="px-3 py-2 bg-[#122A4E]/30 rounded-xl border border-cyan-500/5 mb-3">
            <span className="text-[10px] text-slate-400 block uppercase font-bold mb-1">
              Địa bàn Đặc khu:
            </span>
            <span className="text-xs font-semibold text-cyan-400">
              Hòn Tre • Lại Sơn • An Sơn • Nam Du
            </span>
          </div>

          {[
            {
              id: 'tong-quan',
              label: 'Dashboard Song Song',
              icon: Layers,
              subtitle: 'Bộ Chỉ Huy 2 Tầng Tiêu Chí',
            },
            {
              id: 'layer-1',
              label: 'Tầng 1: Chuẩn CĐS 2.0',
              icon: ShieldCheck,
              subtitle: `DEI ${activeMetrics.layer1.deiScore}% (Kinh tế & Xã hội)`,
            },
            {
              id: 'layer-2',
              label: 'Tầng 2: Hệ sinh thái PDF',
              icon: Building2,
              subtitle: '5 nhóm A-E từ báo cáo',
            },
            {
              id: 'ai-command-center',
              label: 'Trợ lý AI Điều Hành',
              icon: Bot,
              isNew: true,
            },
          ].map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSelectedZone(null);
                }}
                className={`w-full flex flex-col items-start px-4 py-3 rounded-xl transition-all text-left ${
                  isActive
                    ? 'bg-[#122A4E] border-l-4 border-cyan-400 text-cyan-200 font-bold'
                    : 'text-slate-300 hover:bg-[#122A4E]/20 hover:text-white'
                }`}
              >
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IconComponent
                      className={`h-4.5 w-4.5 ${
                        isActive ? 'text-cyan-400' : 'text-slate-400'
                      }`}
                    />
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                  {item.isNew && (
                    <span className="bg-cyan-500 text-slate-900 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider">
                      GEMINI
                    </span>
                  )}
                </div>
                {item.subtitle && (
                  <span className="text-[10px] text-slate-400 font-normal pl-7 mt-0.5">
                    {item.subtitle}
                  </span>
                )}
              </button>
            );
          })}

          {/* Core drilldown and telemetry widgets */}
          <div className="mt-auto pt-4 border-t border-cyan-500/10">
            <div className="bg-[#122A4E]/30 rounded-xl p-3 border border-cyan-500/5">
              <span className="text-[10px] text-cyan-400 font-bold block mb-1">
                LÝ THUYẾT QUẢN TRỊ KÉP
              </span>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Tầng 1 tập trung đo đạc tiến trình thâm nhập số thực tế của
                người dân và hộ kinh doanh. Tầng 2 điều hành hạ tầng cốt lõi
                doanh nghiệp từ báo cáo PDF.
              </p>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto max-w-full flex flex-col gap-6">
          {/* TAB 1: COCKPIT SONG SONG TỔNG QUAN */}
          {activeTab === 'tong-quan' && (
            <>
              {/* Feature 1: ✨ AI Scan Dashboard Panel */}
              <div className="bg-[#0C213A] border border-cyan-500/20 rounded-3xl p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-1.5 flex-1">
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-500/30 font-bold uppercase tracking-wider">
                    ✨ Gemini LLM Engine - Hệ Thống Điều Hành Kép
                  </span>
                  <h2 className="text-xl font-black text-white">
                    ✨ AI QUÉT & PHÂN TÍCH MÂU THUẪN LIÊN TẦNG DỮ LIỆU
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                    Nhấn nút quét bên dưới để AI tự động trích xuất điểm mâu
                    thuẫn giữa Tầng tiêu chí 2.0 (Dân sự) và Tầng hệ sinh thái
                    mở rộng (PDF Doông nghiệp), đề xuất hành động chỉ đạo tức
                    thời.
                  </p>
                </div>

                <div className="flex flex-col gap-3 min-w-[180px] w-full lg:w-auto">
                  <button
                    onClick={handleDeepScan}
                    disabled={aiIsLoading}
                    className="bg-cyan-500 hover:bg-cyan-600 transition-all text-slate-900 font-bold text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Bot className="h-4.5 w-4.5" />
                    <span>✨ AI QUÉT CẢNH BÁO</span>
                  </button>
                </div>
              </div>

              {deepScanResult && (
                <div className="bg-[#0A2540] border border-cyan-500/25 rounded-2xl p-5 text-xs leading-relaxed text-slate-100 flex flex-col md:flex-row gap-4 justify-between items-start animate-in fade-in duration-300">
                  <div className="flex-1 whitespace-pre-wrap">
                    {deepScanResult}
                  </div>
                  <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto mt-2 md:mt-0">
                    <button
                      onClick={() => handlePlayTTS(deepScanResult)}
                      className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                        isPlayingBriefing
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
                          : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20'
                      }`}
                    >
                      {isPlayingBriefing ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                      <span>
                        {isPlayingBriefing
                          ? 'Dừng đọc'
                          : '✨ Nghe Thuyết Minh AI'}
                      </span>
                    </button>
                    <button
                      onClick={() => handleCopyClipboard(deepScanResult)}
                      className="flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all border border-slate-700"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Sao chép kết quả</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Parallel Indicator Cards */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Dial Gauge Kinh tế số Tầng 1 */}
                <div className="bg-[#0A2540] border border-cyan-500/20 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                      CHỈ SỐ DEI TỔNG HỢP (TẦNG 1)
                    </span>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-3.5xl font-black text-cyan-400 font-mono">
                        {activeMetrics.layer1.deiScore}
                      </span>
                      <span className="text-sm text-slate-400">/ 100đ</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-2 border-t border-cyan-500/5 flex justify-between text-[11px] text-slate-300">
                    <span>
                      Doanh nghiệp: {activeMetrics.layer1.b1.active} DN
                    </span>
                    <span>
                      OCOP số hóa: {activeMetrics.layer1.b2.active} SP
                    </span>
                  </div>
                </div>

                {/* E-commerce Revenue Tầng 1 */}
                <div className="bg-[#0A2540] border border-cyan-500/20 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                      DOANH THU TMĐT (TẦNG 1)
                    </span>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-3.5xl font-black text-emerald-400 font-mono">
                        {activeMetrics.layer1.b3.revenue} Tỷ
                      </span>
                      <span className="text-xs text-emerald-400 font-bold">
                        ▲ 23%
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-2 border-t border-cyan-500/5 flex justify-between text-[11px] text-slate-300">
                    <span>
                      Đơn hàng:{' '}
                      {activeMetrics.layer1.b3.orders.toLocaleString()} đơn
                    </span>
                    <span>
                      Khách mới:{' '}
                      {activeMetrics.layer1.b3.newCustomers.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Operations & Cloud Tầng 2 */}
                <div className="bg-[#0A2540] border border-cyan-500/20 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                      HẠ TẦNG SỐ HÓA (TẦNG 2)
                    </span>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-3.5xl font-black text-indigo-400 font-mono">
                        {activeMetrics.layer2.nhomA.digitalEnterprises}
                      </span>
                      <span className="text-sm text-slate-400">
                        / 211 DN tổng
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-2 border-t border-cyan-500/5 flex justify-between text-[11px] text-slate-300">
                    <span>
                      Lên Cloud: {activeMetrics.layer2.nhomA.cloudEnterprises}{' '}
                      DN
                    </span>
                    <span>
                      CĐS toàn diện:{' '}
                      {activeMetrics.layer2.nhomA.comprehensiveDigital} DN
                    </span>
                  </div>
                </div>

                {/* Operations & Personnel Tầng 2 */}
                <div className="bg-[#0A2540] border border-cyan-500/20 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                      VẬN HÀNH & NHÂN LỰC (TẦNG 2)
                    </span>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-3.5xl font-black text-amber-400 font-mono">
                        {activeMetrics.layer2.nhomC.totalPersonnel.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400">Nhân sự</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-2 border-t border-cyan-500/5 flex justify-between text-[11px] text-rose-400 font-bold">
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      {activeMetrics.layer2.nhomC.trainingCourses} khóa đào tạo
                      số
                    </span>
                  </div>
                </div>
              </section>

              {/* Parallel Drilldown Map & Quick AI Alerts */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* SVG Drilldown Map of Kiên Hải - Col 5 */}
                <div className="lg:col-span-5 bg-[#0A2540] border border-cyan-500/10 rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-cyan-400" />
                        <h2 className="text-sm font-bold tracking-tight uppercase text-white">
                          BẢN ĐỒ ĐỊA LÝ PHÂN KHU ĐẶC KHU
                        </h2>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">
                      Đo đạc nhiệt chuyển đổi số biển đảo. Click vào phân khu để
                      xem chi tiết.
                    </p>
                  </div>

                  <div className="relative w-full aspect-[4/3] bg-[#07111F] rounded-xl border border-cyan-500/10 p-4 flex items-center justify-center overflow-hidden my-2">
                    <svg
                      viewBox="0 0 400 300"
                      className="w-full h-full max-h-[220px]"
                    >
                      {KIENHAI_ZONES.map((zone) => (
                        <g key={zone.id}>
                          <circle
                            cx={
                              zone.id === 'hon-tre'
                                ? 120
                                : zone.id === 'lai-son'
                                ? 280
                                : zone.id === 'an-son'
                                ? 115
                                : 235
                            }
                            cy={
                              zone.id === 'hon-tre'
                                ? 75
                                : zone.id === 'lai-son'
                                ? 125
                                : zone.id === 'an-son'
                                ? 200
                                : 220
                            }
                            r={zone.dei / 2}
                            fill={zone.color}
                            fillOpacity={
                              selectedZone === zone.id ? '0.8' : '0.4'
                            }
                            stroke="#00C2FF"
                            strokeWidth={selectedZone === zone.id ? '3' : '1'}
                            className="cursor-pointer transition-all hover:fill-opacity-80"
                            onClick={() =>
                              setSelectedZone(
                                selectedZone === zone.id ? null : zone.id
                              )
                            }
                          />
                          <text
                            x={
                              zone.id === 'hon-tre'
                                ? 120
                                : zone.id === 'lai-son'
                                ? 280
                                : zone.id === 'an-son'
                                ? 115
                                : 235
                            }
                            y={
                              zone.id === 'hon-tre'
                                ? 75
                                : zone.id === 'lai-son'
                                ? 125
                                : zone.id === 'an-son'
                                ? 200
                                : 220
                            }
                            fill="white"
                            className="text-[9px] font-black pointer-events-none select-none"
                            textAnchor="middle"
                          >
                            {zone.name}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>

                  <div className="text-xs text-slate-300 bg-[#122A4E]/20 p-2.5 rounded-lg border border-cyan-500/5">
                    {selectedZone === null ? (
                      <span>
                        <strong>Quần đảo An Sơn</strong> hiện có tiến độ số hóa
                        thấp nhất (41%), đang gặp trở ngại hạ tầng, cần mở thêm
                        lớp đào tạo lữ hành trực tuyến.
                      </span>
                    ) : (
                      <div>
                        <strong>
                          {
                            KIENHAI_ZONES.find((z) => z.id === selectedZone)
                              ?.name
                          }
                        </strong>
                        :{' '}
                        {KIENHAI_ZONES.find((z) => z.id === selectedZone)?.desc}
                        <div className="mt-1 flex justify-between font-mono text-[10px] text-cyan-400">
                          <span>
                            Doanh nghiệp:{' '}
                            {
                              KIENHAI_ZONES.find((z) => z.id === selectedZone)
                                ?.enterprises
                            }
                          </span>
                          <span>
                            Chỉ số DEI:{' '}
                            {
                              KIENHAI_ZONES.find((z) => z.id === selectedZone)
                                ?.dei
                            }
                            %
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Parallel Double Radar Visualization of Layer 1 & Layer 2 - Col 7 */}
                <div className="lg:col-span-7 bg-[#0A2540] border border-cyan-500/10 rounded-2xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4 border-b border-cyan-500/10 pb-2">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-200">
                      ĐỐI CHIẾU SONG HÀNH ĐA CHIỀU (TẦNG 1 VS TẦNG 2)
                    </h2>
                    <span className="text-xs text-slate-400">
                      Trực quan song song
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Dial Gauge for Layer 1 DEI */}
                    <div className="bg-[#122A4E]/20 p-4 rounded-xl border border-cyan-500/5 flex flex-col items-center">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold text-center mb-3">
                        Tầng 1: DEI Chuẩn 2.0
                      </span>
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="50"
                            fill="none"
                            stroke="#122A4E"
                            strokeWidth="10"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="50"
                            fill="none"
                            stroke="#00C2FF"
                            strokeWidth="10"
                            strokeDasharray={2 * Math.PI * 50}
                            strokeDashoffset={
                              2 *
                              Math.PI *
                              50 *
                              (1 - activeMetrics.layer1.deiScore / 100)
                            }
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="text-2xl font-black font-mono text-white">
                            {activeMetrics.layer1.deiScore}%
                          </span>
                          <span className="text-[8px] text-slate-400 uppercase">
                            Khá
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Radar Chart for Layer 2 A-E */}
                    <div className="bg-[#122A4E]/20 p-4 rounded-xl border border-cyan-500/5 flex flex-col items-center">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold text-center mb-3">
                        Tầng 2: Hệ Sinh Thái Mở Rộng
                      </span>
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg
                          viewBox="0 0 100 100"
                          className="w-full h-full max-h-[110px]"
                        >
                          <polygon
                            points="50,10 90,50 50,90 10,50"
                            fill="none"
                            stroke="#1e293b"
                            strokeWidth="0.5"
                          />
                          {(() => {
                            const valDN =
                              (activeMetrics.layer2.nhomA.digitalEnterprises /
                                250) *
                              40;
                            const valCloud =
                              (activeMetrics.layer2.nhomA.cloudEnterprises /
                                10) *
                              40;
                            const valSoHoa =
                              (activeMetrics.layer2.nhomA.comprehensiveDigital /
                                10) *
                              40;
                            const valNetID = 0;

                            const ptDN = { x: 50, y: 50 - valDN };
                            const ptCloud = { x: 50 + valCloud, y: 50 };
                            const ptSoHoa = { x: 50, y: 50 + valSoHoa };
                            const ptNetID = { x: 50 - valNetID, y: 50 };

                            return (
                              <>
                                <polygon
                                  points={`${ptDN.x},${ptDN.y} ${ptCloud.x},${ptCloud.y} ${ptSoHoa.x},${ptSoHoa.y} ${ptNetID.x},${ptNetID.y}`}
                                  fill="rgba(34, 197, 94, 0.5)"
                                  stroke="#22C55E"
                                  strokeWidth="1.5"
                                />
                              </>
                            );
                          })()}
                        </svg>
                      </div>
                      <span className="text-[9px] text-slate-400 block mt-2">
                        Phổ hạ tầng đám mây:{' '}
                        {activeMetrics.layer2.nhomA.cloudEnterprises}/211 DN
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#122A4E]/20 p-3 rounded-xl border border-cyan-500/5 text-xs text-slate-300 mt-3 leading-relaxed">
                    <strong>Đồng bộ chỉ số song hành</strong>: Lãnh đạo nhìn
                    ngay mối tương quan. Việc thiếu hụt đào tạo ở Tầng 2 (0
                    khóa) chính là nguyên nhân trực tiếp kéo ghì chỉ số chuyển
                    đổi của Hộ kinh doanh cá thể ở Tầng 1 (đứng yên ở mức 38%).
                  </div>
                </div>
              </section>
            </>
          )}

          {/* TAB 2: TẦNG 1 - CHI TIẾT CHUẨN CĐS PHƯỜNG/XÃ 2.0 (B1 -> B8) */}
          {activeTab === 'layer-1' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-cyan-500/10 pb-4">
                <div>
                  <h2 className="text-xl font-black text-cyan-400 flex items-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-cyan-400" /> TẦNG 1: BỘ
                    TIÊU CHÍ KINH TẾ SỐ PHƯỜNG/XÃ 2.0
                  </h2>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold uppercase tracking-wider mr-2">
                      <RefreshCw className="h-3 w-3" /> ĐỒNG BỘ TỪ PDF
                    </span>
                    Các chỉ số thâm nhập số tại Tầng 1 (địa bàn dân cư) được{' '}
                    <strong>nội suy và tính toán trực tiếp</strong> từ kết quả
                    báo cáo nguồn lực doanh nghiệp Tầng 2 (File PDF). Điểm DEI
                    Tổng thể:{' '}
                    <strong className="text-white text-sm">
                      {activeMetrics.layer1.deiScore}%
                    </strong>
                    .
                  </p>
                </div>
              </div>

              {/* Grid 2-columns displaying B1-B8 concurrently with zero obscured content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* B1. DOANH NGHIỆP SỐ HÓA */}
                <div className="bg-[#0A2540] border border-cyan-500/15 rounded-3xl p-5 flex flex-col justify-between">
                  <div className="border-b border-cyan-500/10 pb-3 mb-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-cyan-400" /> B1. DOANH
                      NGHIỆP SỐ HÓA
                    </span>
                    <span className="text-[11px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
                      Tỷ lệ:{' '}
                      {(
                        (activeMetrics.layer1.b1.active /
                          activeMetrics.layer1.b1.total) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-center">
                    <div className="bg-[#122A4E]/30 p-2 rounded-xl">
                      <span className="text-[10px] text-slate-400 block mb-1">
                        Quy mô mở rộng
                      </span>
                      <span className="text-[9px] text-slate-500 block mb-1">
                        (Từ Nhóm E)
                      </span>
                      <strong className="text-lg font-mono text-white">
                        {activeMetrics.layer1.b1.total}
                      </strong>
                    </div>
                    <div className="bg-[#122A4E]/30 p-2 rounded-xl border border-emerald-500/20">
                      <span className="text-[10px] text-emerald-400 block mb-1">
                        Đã số hóa
                      </span>
                      <span className="text-[9px] text-emerald-500/70 block mb-1">
                        (Từ Nhóm A)
                      </span>
                      <strong className="text-lg font-mono text-emerald-400">
                        {activeMetrics.layer1.b1.active}
                      </strong>
                    </div>
                    <div className="bg-[#122A4E]/30 p-2 rounded-xl border border-cyan-500/20">
                      <span className="text-[10px] text-cyan-400 block mb-1">
                        Hạ tầng Cloud
                      </span>
                      <span className="text-[9px] text-cyan-500/70 block mb-1">
                        (Từ Nhóm A)
                      </span>
                      <strong className="text-lg font-mono text-cyan-300">
                        {activeMetrics.layer1.b1.cloud}
                      </strong>
                    </div>
                    <div className="bg-[#122A4E]/30 p-2 rounded-xl border border-indigo-500/20">
                      <span className="text-[10px] text-indigo-400 block mb-1">
                        Hệ thống ERP
                      </span>
                      <span className="text-[9px] text-indigo-500/70 block mb-1">
                        (Từ Nhóm C)
                      </span>
                      <strong className="text-lg font-mono text-indigo-400">
                        {activeMetrics.layer1.b1.erp}
                      </strong>
                    </div>
                  </div>

                  <div className="bg-[#122A4E]/20 p-3.5 rounded-xl border border-cyan-500/5">
                    <span className="text-[10px] text-slate-400 block mb-2 font-bold uppercase">
                      Phễu Chuyển Đổi Số Hoạt Động (CĐS Funnel):
                    </span>
                    <div className="space-y-1.5 text-xs">
                      {[
                        {
                          label: 'Định danh số',
                          val: activeMetrics.layer1.b1.active,
                          color: 'bg-cyan-500',
                          width: 'w-full',
                        },
                        {
                          label: 'Hạ tầng đám mây',
                          val: activeMetrics.layer1.b1.cloud,
                          color: 'bg-emerald-500',
                          width: 'w-3/5',
                        },
                        {
                          label: 'Hoạch định tài nguyên',
                          val: activeMetrics.layer1.b1.erp,
                          color: 'bg-indigo-500',
                          width: 'w-2/5',
                        },
                        {
                          label: 'Ứng dụng AI (Nhóm A)',
                          val: activeMetrics.layer1.b1.ai,
                          color: 'bg-purple-500',
                          width: 'w-1/5',
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between"
                        >
                          <span className="text-[11px] text-slate-300">
                            {item.label}
                          </span>
                          <div className="flex-1 bg-slate-900/60 h-4.5 rounded overflow-hidden mx-3 relative flex items-center px-1.5">
                            <div
                              className={`${item.color} h-full opacity-35 absolute left-0 top-0 ${item.width}`}
                            ></div>
                            <span className="text-[9px] font-mono font-bold z-10">
                              {item.val} DN
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* B2. SẢN PHẨM OCOP & ĐẶC SẢN SỐ HÓA */}
                <div className="bg-[#0A2540] border border-cyan-500/15 rounded-3xl p-5 flex flex-col justify-between">
                  <div className="border-b border-cyan-500/10 pb-3 mb-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                      <Award className="h-5 w-5 text-cyan-400" /> B2. SẢN PHẨM
                      OCOP & ĐẶC SẢN ĐỊA PHƯƠNG SỐ HÓA
                    </span>
                    <span className="text-[11px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded font-mono font-bold">
                      Tỷ lệ:{' '}
                      {(
                        (activeMetrics.layer1.b2.active /
                          activeMetrics.layer1.b2.total) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5 text-center mb-4">
                    <div className="bg-[#122A4E]/30 p-2 rounded-xl">
                      <span className="text-[9px] text-slate-400 block">
                        Tổng số SP
                      </span>
                      <strong className="text-sm font-mono text-white">
                        {activeMetrics.layer1.b2.total}
                      </strong>
                    </div>
                    <div className="bg-[#122A4E]/30 p-2 rounded-xl">
                      <span className="text-[9px] text-slate-400 block">
                        Số hóa
                      </span>
                      <strong className="text-sm font-mono text-cyan-400">
                        {activeMetrics.layer1.b2.active}
                      </strong>
                    </div>
                    <div className="bg-[#122A4E]/30 p-2 rounded-xl">
                      <span className="text-[9px] text-slate-400 block">
                        Lên sàn
                      </span>
                      <strong className="text-sm font-mono text-emerald-400">
                        {activeMetrics.layer1.b2.ecom}
                      </strong>
                    </div>
                    <div className="bg-[#122A4E]/30 p-2 rounded-xl">
                      <span className="text-[9px] text-slate-400 block">
                        Mã QR
                      </span>
                      <strong className="text-sm font-mono text-indigo-400">
                        {activeMetrics.layer1.b2.qr}
                      </strong>
                    </div>
                    <div className="bg-[#122A4E]/30 p-2 rounded-xl">
                      <span className="text-[9px] text-slate-400 block">
                        Xuất khẩu
                      </span>
                      <strong className="text-sm font-mono text-purple-400">
                        {activeMetrics.layer1.b2.export}
                      </strong>
                    </div>
                  </div>

                  <div className="bg-[#122A4E]/20 p-3 rounded-xl border border-cyan-500/5 relative aspect-[21/9] flex flex-col justify-between overflow-hidden">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Bản đồ OCOP và chỉ định vị trí định danh:
                    </span>
                    <svg
                      viewBox="0 0 300 100"
                      className="w-full h-full max-h-[80px]"
                    >
                      <circle cx="80" cy="35" r="4" fill="#EF4444" />
                      <circle cx="80" cy="35" r="2" fill="#EF4444" />
                      <text
                        x="88"
                        y="38"
                        fill="white"
                        className="text-[8px] font-black"
                      >
                        Xoài Cát Hòn Tre
                      </text>

                      <circle cx="200" cy="65" r="4" fill="#22C55E" />
                      <circle cx="200" cy="65" r="2" fill="#22C55E" />
                      <text
                        x="208"
                        y="68"
                        fill="white"
                        className="text-[8px] font-black"
                      >
                        Nước mắm cá cơm Lại Sơn
                      </text>
                    </svg>
                  </div>
                </div>

                {/* B3. GIAO DỊCH & THƯƠNG MẠI ĐIỆN TỬ */}
                <div className="bg-[#0A2540] border border-cyan-500/15 rounded-3xl p-5 flex flex-col justify-between">
                  <div className="border-b border-cyan-500/10 pb-3 mb-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-cyan-400" /> B3.
                      DOANH THU & GIAO DỊCH TMĐT
                    </span>
                    <span className="text-[11px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
                      Đồng bộ LIVE
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-[#122A4E]/30 p-3 rounded-2xl text-center border border-emerald-500/20">
                      <span className="text-[10px] text-emerald-400 block font-bold mb-1">
                        NỘI SUY TỪ NHÓM D
                      </span>
                      <span className="text-xs text-slate-400">
                        Doanh thu giao thương
                      </span>
                      <strong className="text-2xl font-mono font-black text-emerald-400 block mt-1">
                        {activeMetrics.layer1.b3.revenue} Tỷ VNĐ
                      </strong>
                    </div>
                    <div className="bg-[#122A4E]/30 p-3 rounded-2xl text-center border border-white/10">
                      <span className="text-[10px] text-slate-300 block font-bold mb-1">
                        NỘI SUY TỪ NHÓM B
                      </span>
                      <span className="text-xs text-slate-400">
                        Đơn hàng hoàn tất
                      </span>
                      <strong className="text-2xl font-mono font-black text-white block mt-1">
                        {activeMetrics.layer1.b3.orders.toLocaleString()} đơn
                      </strong>
                    </div>
                  </div>

                  <div className="bg-[#122A4E]/20 p-3 rounded-xl border border-cyan-500/5 text-xs">
                    <div className="flex justify-between border-b border-cyan-500/5 pb-1.5 mb-1.5 text-[11px] text-slate-300">
                      <span>Tỷ lệ khách quay lại mua:</span>
                      <strong className="text-white font-mono">
                        {activeMetrics.layer1.b3.repeatRatio}%
                      </strong>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-300">
                      <span>Số khách hàng mua mới tháng này:</span>
                      <strong className="text-white font-mono">
                        +{activeMetrics.layer1.b3.newCustomers.toLocaleString()}{' '}
                        người
                      </strong>
                    </div>
                  </div>
                </div>

                {/* B4. THANH TOÁN KHÔNG TIỀN MẶT */}
                <div className="bg-[#0A2540] border border-cyan-500/15 rounded-3xl p-5 flex flex-col justify-between">
                  <div className="border-b border-cyan-500/10 pb-3 mb-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-cyan-400" /> B4. TỶ LỆ
                      THANH TOÁN KHÔNG DÙNG TIỀN MẶT
                    </span>
                    <span className="text-[11px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded font-mono font-bold">
                      Hiện tại: {activeMetrics.layer1.b4.ratio}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="48"
                          cy="44"
                          r="38"
                          fill="none"
                          stroke="#122A4E"
                          strokeWidth="8"
                        />
                        <circle
                          cx="48"
                          cy="44"
                          r="38"
                          fill="none"
                          stroke="#22C55E"
                          strokeWidth="8"
                          strokeDasharray={2 * Math.PI * 38}
                          strokeDashoffset={
                            2 *
                            Math.PI *
                            38 *
                            (1 - activeMetrics.layer1.b4.ratio / 100)
                          }
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-base font-black font-mono text-white">
                          {activeMetrics.layer1.b4.ratio}%
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-[#122A4E]/20 p-2 rounded border border-cyan-500/5">
                        <span className="text-[9px] text-slate-400 block">
                          QR Pay
                        </span>
                        <strong className="font-mono text-cyan-300">
                          {activeMetrics.layer1.b4.qrPay}%
                        </strong>
                      </div>
                      <div className="bg-[#122A4E]/20 p-2 rounded border border-cyan-500/5">
                        <span className="text-[9px] text-slate-400 block">
                          Mobile Bank
                        </span>
                        <strong className="font-mono text-cyan-300">
                          {activeMetrics.layer1.b4.mobileBank}%
                        </strong>
                      </div>
                      <div className="bg-[#122A4E]/20 p-2 rounded border border-cyan-500/5">
                        <span className="text-[9px] text-slate-400 block">
                          Ví điện tử
                        </span>
                        <strong className="font-mono text-cyan-300">
                          {activeMetrics.layer1.b4.eWallet}%
                        </strong>
                      </div>
                      <div className="bg-[#122A4E]/20 p-2 rounded border border-cyan-500/5">
                        <span className="text-[9px] text-slate-400 block">
                          Máy POS
                        </span>
                        <strong className="font-mono text-cyan-300">
                          {activeMetrics.layer1.b4.pos}%
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* B5. HỘ KINH DOANH CÁ THỂ SỐ HÓA */}
                <div className="bg-[#0A2540] border border-cyan-500/15 rounded-3xl p-5 flex flex-col justify-between">
                  <div className="border-b border-cyan-500/10 pb-3 mb-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                      <Users className="h-5 w-5 text-cyan-400" /> B5. HỘ KINH
                      DOANH CÁ THỂ SỐ HÓA
                    </span>
                    <span className="text-[11px] bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded font-mono font-bold">
                      Tỷ lệ số hóa:{' '}
                      {(
                        (activeMetrics.layer1.b5.active /
                          activeMetrics.layer1.b5.total) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-center">
                    <div className="bg-[#122A4E]/30 p-2.5 rounded-xl">
                      <span className="text-xs text-slate-400 block">
                        Tổng số hộ khảo sát
                      </span>
                      <strong className="text-xl font-mono text-white">
                        {activeMetrics.layer1.b5.total.toLocaleString()}
                      </strong>
                    </div>
                    <div className="bg-[#122A4E]/30 p-2.5 rounded-xl border border-rose-500/30 relative">
                      <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 bg-rose-500 text-slate-900 text-[8px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">
                        PHỤ THUỘC ĐÀO TẠO (NHÓM C)
                      </div>
                      <span className="text-xs text-slate-400 block mt-2">
                        Hộ kinh doanh số
                      </span>
                      <strong className="text-xl font-mono text-rose-400">
                        {activeMetrics.layer1.b5.active}
                      </strong>
                    </div>
                  </div>

                  <div className="bg-[#122A4E]/20 p-3 rounded-xl border border-cyan-500/5 text-xs space-y-1.5">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Xếp hạng mức độ trưởng thành (Mức 1-5):
                    </span>
                    {activeMetrics.layer1.b5.levels.map((val, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-[11px]"
                      >
                        <span className="text-slate-300 font-bold">
                          Mức {idx + 1}:
                        </span>
                        <div className="flex-1 bg-slate-900/60 h-4 rounded overflow-hidden mx-3 relative flex items-center px-2 border border-cyan-500/5">
                          <div
                            className="bg-rose-500 h-full opacity-30 absolute left-0"
                            style={{
                              width: `${
                                (val / activeMetrics.layer1.b5.levels[0]) * 100
                              }%`,
                            }}
                          ></div>
                          <span className="text-[9px] font-mono z-10 text-white">
                            {val} hộ kinh doanh
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* B6. DU LỊCH LỮ HÀNH SỐ */}
                <div className="bg-[#0A2540] border border-cyan-500/15 rounded-3xl p-5 flex flex-col justify-between">
                  <div className="border-b border-cyan-500/10 pb-3 mb-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                      <Globe className="h-5 w-5 text-cyan-400" /> B6. PHỔ CẬP DU
                      LỊCH LỮ HÀNH SỐ
                    </span>
                    <span className="text-[11px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded font-mono font-bold">
                      Số hóa: {activeMetrics.layer1.b6.ratio}%
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                    <div className="bg-[#122A4E]/30 p-3 rounded-xl">
                      <span className="text-[10px] text-slate-400 block">
                        Số hóa điểm lữ hành
                      </span>
                      <strong className="text-lg font-mono text-purple-300">
                        {activeMetrics.layer1.b6.ratio}%
                      </strong>
                    </div>
                    <div className="bg-[#122A4E]/30 p-3 rounded-xl">
                      <span className="text-[10px] text-slate-400 block">
                        Lượt khách online
                      </span>
                      <strong className="text-lg font-mono text-white">
                        {activeMetrics.layer1.b6.onlineGuests.toLocaleString()}
                      </strong>
                    </div>
                    <div className="bg-[#122A4E]/30 p-3 rounded-xl">
                      <span className="text-[10px] text-slate-400 block">
                        Doanh thu du lịch số
                      </span>
                      <strong className="text-lg font-mono text-emerald-400">
                        {activeMetrics.layer1.b6.revenue} Tỷ
                      </strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 italic">
                    Tích hợp hoàn thành đặt vé tàu cao tốc online, check-in số
                    và các trang bình chọn danh lam thắng cảnh tự động.
                  </p>
                </div>

                {/* B7. NÔNG NGHIỆP CÔNG NGHỆ SỐ */}
                <div className="bg-[#0A2540] border border-cyan-500/15 rounded-3xl p-5 flex flex-col justify-between">
                  <div className="border-b border-cyan-500/10 pb-3 mb-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                      <Sprout className="h-5 w-5 text-cyan-400" /> B7. CHUỖI GIÁ
                      TRỊ NÔNG NGHIỆP CÔNG NGHỆ SỐ
                    </span>
                    <span className="text-[11px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
                      Đạt chuẩn quốc gia
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center mb-4">
                    <div className="bg-[#122A4E]/20 p-2.5 rounded border border-cyan-500/5">
                      <span className="text-[9px] text-slate-400 block">
                        Vùng trồng số hóa
                      </span>
                      <strong className="font-mono text-white text-sm">
                        {activeMetrics.layer1.b7.farmRatio}%
                      </strong>
                    </div>
                    <div className="bg-[#122A4E]/20 p-2.5 rounded border border-cyan-500/5">
                      <span className="text-[9px] text-slate-400 block">
                        Truy xuất nguồn gốc
                      </span>
                      <strong className="font-mono text-emerald-400 text-sm">
                        {activeMetrics.layer1.b7.qrTrace}%
                      </strong>
                    </div>
                    <div className="bg-[#122A4E]/20 p-2.5 rounded border border-cyan-500/5">
                      <span className="text-[9px] text-slate-400 block">
                        Trạm IoT Farm
                      </span>
                      <strong className="font-mono text-cyan-300 text-sm">
                        {activeMetrics.layer1.b7.iotFarm}%
                      </strong>
                    </div>
                    <div className="bg-[#122A4E]/20 p-2.5 rounded border border-cyan-500/5">
                      <span className="text-[9px] text-slate-400 block">
                        Nông sản lên sàn
                      </span>
                      <strong className="font-mono text-indigo-300 text-sm">
                        {activeMetrics.layer1.b7.ecomAgri}%
                      </strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Sản phẩm nông hải sản được tích hợp vào chuỗi phân phối số
                    hóa: Nông dân → HTX → Doanh nghiệp chế biến → Sàn TMĐT nông
                    sản Việt.
                  </p>
                </div>

                {/* B8. KHỞI NGHIỆP & ĐỔI MỚI SÁNG TẠO */}
                <div className="bg-[#0A2540] border border-cyan-500/15 rounded-3xl p-5 flex flex-col justify-between">
                  <div className="border-b border-cyan-500/10 pb-3 mb-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                      <Compass className="h-5 w-5 text-cyan-400" /> B8. HỆ SINH
                      THÁI KHỞI NGHIỆP & ĐỔI MỚI SÁNG TẠO
                    </span>
                    <span className="text-[11px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded font-mono font-bold">
                      Quy mô 2026
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-[#122A4E]/30 p-2 rounded-xl">
                      <span className="text-[9px] text-slate-400 block">
                        Startup
                      </span>
                      <strong className="text-base font-mono text-white">
                        {activeMetrics.layer1.b8.startups}
                      </strong>
                    </div>
                    <div className="bg-[#122A4E]/30 p-2 rounded-xl">
                      <span className="text-[9px] text-slate-400 block">
                        Dự án ươm
                      </span>
                      <strong className="text-base font-mono text-cyan-400">
                        {activeMetrics.layer1.b8.projects}
                      </strong>
                    </div>
                    <div className="bg-[#122A4E]/30 p-2 rounded-xl">
                      <span className="text-[9px] text-slate-400 block">
                        Chuyên gia
                      </span>
                      <strong className="text-base font-mono text-emerald-400">
                        {activeMetrics.layer1.b8.mentors}
                      </strong>
                    </div>
                    <div className="bg-[#122A4E]/30 p-2 rounded-xl">
                      <span className="text-[9px] text-slate-400 block">
                        Nhà đầu tư
                      </span>
                      <strong className="text-base font-mono text-indigo-400">
                        {activeMetrics.layer1.b8.investors}
                      </strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-4 italic">
                    Kiến tạo các mô hình Hub Xanh bảo vệ hệ sinh thái biển kết
                    hợp chuyển giao công nghệ năng lượng tái tạo hải đảo.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TẦNG 2 - CHI TIẾT HỆ SINH THÁI DOANH NGHIỆP TỪ PDF (A -> E) */}
          {activeTab === 'layer-2' && (
            <div className="bg-[#0A2540] border border-cyan-500/10 rounded-3xl p-6 flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-cyan-500/10 pb-4 gap-4">
                <div>
                  <h2 className="text-xl font-black text-emerald-400 flex items-center gap-2">
                    <Building2 className="h-6 w-6 text-emerald-400" /> TẦNG 2:
                    BỘ TIÊU CHÍ MỞ RỘNG ĐỊA PHƯƠNG (PDF GỐC)
                  </h2>
                  <p className="text-xs text-slate-400">
                    Quản lý hạ tầng sẵn sàng đám mây, nhân lực, lượng traffic,
                    Google SEO và thống kê tin tức thiện nguyện.
                  </p>
                </div>

                {/* Sub layer-2 selectors (A to E) */}
                <div className="flex items-center flex-wrap gap-1.5 bg-[#122A4E] p-1 rounded-xl border border-cyan-500/5">
                  {[
                    { id: 'ALL', label: 'Tổng quan Nhóm A-E' },
                    { id: 'A', label: 'Nhóm A (Hạ tầng)' },
                    { id: 'B', label: 'Nhóm B (TMĐT)' },
                    { id: 'C', label: 'Nhóm C (Nguồn lực)' },
                    { id: 'D', label: 'Nhóm D (Tương tác)' },
                    { id: 'E', label: 'Nhóm E (Thông tin)' },
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setActiveSubAE(sub.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeSubAE === sub.id
                          ? 'bg-emerald-500 text-slate-900'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* TỔNG QUAN TẤT CẢ CÁC NHÓM A-E */}
              {activeSubAE === 'ALL' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 animate-in fade-in duration-200">
                  {/* Card Nhóm A */}
                  <div
                    onClick={() => setActiveSubAE('A')}
                    className="bg-[#122A4E]/30 p-4 rounded-xl border border-cyan-500/10 hover:bg-[#122A4E]/60 hover:border-cyan-400/50 cursor-pointer transition-all flex flex-col justify-between h-full group"
                  >
                    <div>
                      <span className="text-xs font-black text-white block mb-3 pb-2 border-b border-cyan-500/20">
                        NHÓM A - HẠ TẦNG
                      </span>
                      <div className="space-y-2.5 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span>DN Số hóa:</span>{' '}
                          <span className="font-mono text-white font-bold">
                            {activeMetrics.layer2.nhomA.digitalEnterprises}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Lên Cloud:</span>{' '}
                          <span className="font-mono text-emerald-400 font-bold">
                            {activeMetrics.layer2.nhomA.cloudEnterprises}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>CĐS toàn diện:</span>{' '}
                          <span className="font-mono text-indigo-400 font-bold">
                            {activeMetrics.layer2.nhomA.comprehensiveDigital}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-cyan-500/0 group-hover:text-cyan-400 mt-4 block text-right transition-all font-bold">
                      Xem chi tiết ➔
                    </span>
                  </div>

                  {/* Card Nhóm B */}
                  <div
                    onClick={() => setActiveSubAE('B')}
                    className="bg-[#122A4E]/30 p-4 rounded-xl border border-cyan-500/10 hover:bg-[#122A4E]/60 hover:border-cyan-400/50 cursor-pointer transition-all flex flex-col justify-between h-full group"
                  >
                    <div>
                      <span className="text-xs font-black text-white block mb-3 pb-2 border-b border-cyan-500/20">
                        NHÓM B - TMĐT
                      </span>
                      <div className="space-y-2.5 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span>Sản phẩm CĐS:</span>{' '}
                          <span className="font-mono text-cyan-400 font-bold">
                            {activeMetrics.layer2.nhomB.digitalProducts}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Đơn hàng:</span>{' '}
                          <span className="font-mono text-emerald-400 font-bold">
                            {activeMetrics.layer2.nhomB.ecomOrders}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Tăng trưởng:</span>{' '}
                          <span className="font-mono text-white font-bold">
                            +{activeMetrics.layer2.nhomB.growthRate}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-cyan-500/0 group-hover:text-cyan-400 mt-4 block text-right transition-all font-bold">
                      Xem chi tiết ➔
                    </span>
                  </div>

                  {/* Card Nhóm C */}
                  <div
                    onClick={() => setActiveSubAE('C')}
                    className={`bg-[#122A4E]/30 p-4 rounded-xl border ${
                      activeMetrics.layer2.nhomC.trainingCourses === 0
                        ? 'border-rose-500/30'
                        : 'border-cyan-500/10'
                    } hover:bg-[#122A4E]/60 hover:border-rose-400/50 cursor-pointer transition-all flex flex-col justify-between h-full group relative overflow-hidden`}
                  >
                    {activeMetrics.layer2.nhomC.trainingCourses === 0 && (
                      <div className="absolute top-0 right-0 w-1.5 h-full bg-rose-500/80"></div>
                    )}
                    <div>
                      <span className="text-xs font-black text-white block mb-3 pb-2 border-b border-cyan-500/20 flex items-center gap-1.5">
                        NHÓM C - NGUỒN LỰC{' '}
                        {activeMetrics.layer2.nhomC.trainingCourses === 0 && (
                          <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
                        )}
                      </span>
                      <div className="space-y-2.5 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span>Tổng nhân sự:</span>{' '}
                          <span className="font-mono text-white font-bold">
                            {activeMetrics.layer2.nhomC.totalPersonnel.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Hệ thống ERP:</span>{' '}
                          <span className="font-mono text-indigo-400 font-bold">
                            {activeMetrics.layer2.nhomC.erpSystems}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Khóa đào tạo:</span>{' '}
                          <span
                            className={`font-mono font-bold ${
                              activeMetrics.layer2.nhomC.trainingCourses === 0
                                ? 'text-rose-400 animate-pulse'
                                : 'text-emerald-400'
                            }`}
                          >
                            {activeMetrics.layer2.nhomC.trainingCourses}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-cyan-500/0 group-hover:text-rose-400 mt-4 block text-right transition-all font-bold">
                      Xem chi tiết ➔
                    </span>
                  </div>

                  {/* Card Nhóm D */}
                  <div
                    onClick={() => setActiveSubAE('D')}
                    className="bg-[#122A4E]/30 p-4 rounded-xl border border-cyan-500/10 hover:bg-[#122A4E]/60 hover:border-cyan-400/50 cursor-pointer transition-all flex flex-col justify-between h-full group"
                  >
                    <div>
                      <span className="text-xs font-black text-white block mb-3 pb-2 border-b border-cyan-500/20">
                        NHÓM D - TƯƠNG TÁC
                      </span>
                      <div className="space-y-2.5 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span>Tổng lượt xem:</span>{' '}
                          <span className="font-mono text-white font-bold">
                            {activeMetrics.layer2.nhomD.pageViews.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Khách hàng:</span>{' '}
                          <span className="font-mono text-indigo-400 font-bold">
                            {activeMetrics.layer2.nhomD.customers.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Doanh thu:</span>{' '}
                          <span className="font-mono text-emerald-400 font-bold">
                            {activeMetrics.layer2.nhomD.revenue}Tr
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-cyan-500/0 group-hover:text-cyan-400 mt-4 block text-right transition-all font-bold">
                      Xem chi tiết ➔
                    </span>
                  </div>

                  {/* Card Nhóm E */}
                  <div
                    onClick={() => setActiveSubAE('E')}
                    className="bg-[#122A4E]/30 p-4 rounded-xl border border-cyan-500/10 hover:bg-[#122A4E]/60 hover:border-cyan-400/50 cursor-pointer transition-all flex flex-col justify-between h-full group"
                  >
                    <div>
                      <span className="text-xs font-black text-white block mb-3 pb-2 border-b border-cyan-500/20">
                        NHÓM E - THÔNG TIN
                      </span>
                      <div className="space-y-2.5 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span>Bảng tin KH:</span>{' '}
                          <span className="font-mono text-cyan-400 font-bold">
                            {activeMetrics.layer2.nhomE.boardNews}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Kêu gọi ĐT:</span>{' '}
                          <span className="font-mono text-emerald-400 font-bold">
                            {activeMetrics.layer2.nhomE.investmentCalls}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Dự án lớn:</span>{' '}
                          <span className="font-mono text-amber-400 font-bold">
                            {activeMetrics.layer2.nhomE.projects}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-cyan-500/0 group-hover:text-cyan-400 mt-4 block text-right transition-all font-bold">
                      Xem chi tiết ➔
                    </span>
                  </div>
                </div>
              )}

              {/* Nhóm A Content */}
              {activeSubAE === 'A' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center animate-in fade-in duration-200">
                  <div className="bg-[#122A4E]/30 p-4 rounded-xl border border-cyan-500/10">
                    <span className="text-xs text-slate-400 block">
                      Doanh nghiệp số hóa thông tin
                    </span>
                    <strong className="text-2xl font-mono text-white block mt-2">
                      {activeMetrics.layer2.nhomA.digitalEnterprises} DN
                    </strong>
                  </div>
                  <div className="bg-[#122A4E]/30 p-4 rounded-xl border border-cyan-500/10">
                    <span className="text-xs text-slate-400 block">
                      Doanh nghiệp lên Cloud
                    </span>
                    <strong className="text-2xl font-mono text-emerald-400 block mt-2">
                      {activeMetrics.layer2.nhomA.cloudEnterprises} DN
                    </strong>
                  </div>
                  <div className="bg-[#122A4E]/30 p-4 rounded-xl border border-cyan-500/10">
                    <span className="text-xs text-slate-400 block">
                      Doanh nghiệp CĐS toàn diện
                    </span>
                    <strong className="text-2xl font-mono text-indigo-400 block mt-2">
                      {activeMetrics.layer2.nhomA.comprehensiveDigital} DN
                    </strong>
                  </div>
                  <div className="bg-[#122A4E]/30 p-4 rounded-xl border border-cyan-500/10">
                    <span className="text-xs text-slate-400 block">
                      Tài khoản Card NetID
                    </span>
                    <strong className="text-2xl font-mono text-rose-500 block mt-2">
                      {activeMetrics.layer2.nhomA.netIdCards}
                    </strong>
                  </div>
                </div>
              )}

              {/* Nhóm B Content */}
              {activeSubAE === 'B' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
                  <div className="bg-[#122A4E]/30 p-5 rounded-2xl border border-cyan-500/10">
                    <span className="text-xs text-slate-400">
                      Số lượng sản phẩm/dịch vụ CĐS:
                    </span>
                    <strong className="text-2xl font-mono text-cyan-400 block mt-2">
                      {activeMetrics.layer2.nhomB.digitalProducts} sản phẩm
                    </strong>
                  </div>
                  <div className="bg-[#122A4E]/30 p-5 rounded-2xl border border-cyan-500/10">
                    <span className="text-xs text-slate-400">
                      Tổng đơn hàng giao dịch hàng tháng:
                    </span>
                    <strong className="text-2xl font-mono text-emerald-400 block mt-2">
                      {activeMetrics.layer2.nhomB.ecomOrders} đơn
                    </strong>
                  </div>
                </div>
              )}

              {/* Nhóm C Content */}
              {activeSubAE === 'C' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
                  <div className="bg-[#122A4E]/30 p-5 rounded-2xl border border-cyan-500/10 text-center">
                    <span className="text-xs text-slate-400">
                      Hệ thống quản lý ERP hoạt động:
                    </span>
                    <strong className="text-2xl font-mono text-indigo-400 block mt-2">
                      {activeMetrics.layer2.nhomC.erpSystems} hệ thống
                    </strong>
                  </div>
                  <div className="bg-[#122A4E]/30 p-5 rounded-2xl border border-cyan-500/10 text-center">
                    <span className="text-xs text-slate-400">
                      Nhân sự tham gia kinh tế số:
                    </span>
                    <strong className="text-2xl font-mono text-white block mt-2">
                      {activeMetrics.layer2.nhomC.totalPersonnel.toLocaleString()}
                    </strong>
                  </div>
                  <div className="bg-[#122A4E]/30 p-5 rounded-2xl border border-cyan-500/10 text-center relative overflow-hidden">
                    <span className="text-xs text-slate-400">
                      Khóa đào tạo đã mở:
                    </span>
                    <strong className="text-2xl font-mono text-rose-500 block mt-2">
                      {activeMetrics.layer2.nhomC.trainingCourses}
                    </strong>
                    <div className="absolute top-0 right-0 h-1.5 w-full bg-rose-500"></div>
                  </div>
                </div>
              )}

              {/* Nhóm D Content */}
              {activeSubAE === 'D' && (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center animate-in fade-in duration-200">
                  <div className="bg-[#122A4E]/30 p-4 rounded-xl border border-cyan-500/10">
                    <span className="text-xs text-slate-400 block">
                      Tổng Trang xem
                    </span>
                    <strong className="text-lg font-mono text-white block mt-2">
                      {activeMetrics.layer2.nhomD.pageViews.toLocaleString()}{' '}
                      views
                    </strong>
                  </div>
                  <div className="bg-[#122A4E]/30 p-4 rounded-xl border border-cyan-500/10">
                    <span className="text-xs text-slate-400 block">
                      Số người xem
                    </span>
                    <strong className="text-lg font-mono text-emerald-400 block mt-2">
                      {activeMetrics.layer2.nhomD.viewers.toLocaleString()}
                    </strong>
                  </div>
                  <div className="bg-[#122A4E]/30 p-4 rounded-xl border border-cyan-500/10">
                    <span className="text-xs text-slate-400 block">
                      Google SEO index
                    </span>
                    <strong className="text-lg font-mono text-cyan-400 block mt-2">
                      {activeMetrics.layer2.nhomD.googleSeo.toLocaleString()}
                    </strong>
                  </div>
                  <div className="bg-[#122A4E]/30 p-4 rounded-xl border border-cyan-500/10">
                    <span className="text-xs text-slate-400 block">
                      Số khách hàng
                    </span>
                    <strong className="text-lg font-mono text-indigo-400 block mt-2">
                      {activeMetrics.layer2.nhomD.customers.toLocaleString()}
                    </strong>
                  </div>
                  <div className="bg-[#122A4E]/30 p-4 rounded-xl border border-cyan-500/10">
                    <span className="text-xs text-slate-400 block">
                      Tổng doanh thu
                    </span>
                    <strong className="text-lg font-mono text-purple-400 block mt-2">
                      {activeMetrics.layer2.nhomD.revenue} Triệu VNĐ
                    </strong>
                  </div>
                </div>
              )}

              {/* Nhóm E Content */}
              {activeSubAE === 'E' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-cyan-500/5">
                      <span className="text-xs text-slate-400">
                        Doanh nghiệp khảo sát:
                      </span>
                      <strong className="text-xl text-white block mt-1">
                        {activeMetrics.layer2.nhomE.enterprises}
                      </strong>
                    </div>
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-cyan-500/5">
                      <span className="text-xs text-slate-400">
                        Tin tức bảng tin:
                      </span>
                      <strong className="text-xl text-cyan-400 block mt-1">
                        {activeMetrics.layer2.nhomE.boardNews} bài viết
                      </strong>
                    </div>
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-cyan-500/5">
                      <span className="text-xs text-slate-400">
                        Kêu gọi đầu tư:
                      </span>
                      <strong className="text-xl text-emerald-400 block mt-1">
                        {activeMetrics.layer2.nhomE.investmentCalls} hạng mục
                      </strong>
                    </div>
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-cyan-500/5">
                      <span className="text-xs text-slate-400">Dự án lớn:</span>
                      <strong className="text-xl text-indigo-400 block mt-1">
                        {activeMetrics.layer2.nhomE.projects} dự án
                      </strong>
                    </div>
                  </div>

                  {/* Horizontal Bar Chart Page 3 list */}
                  <div className="bg-[#122A4E]/20 p-5 rounded-2xl border border-cyan-500/10">
                    <span className="text-xs font-bold text-slate-400 block mb-4 uppercase">
                      Dòng phân bố tin tức & hạng mục Nhóm E
                    </span>
                    <div className="space-y-3">
                      {[
                        {
                          label: 'Doanh nghiệp',
                          val: activeMetrics.layer2.nhomE.enterprises,
                          color: 'bg-cyan-500',
                        },
                        {
                          label: 'Bảng tin Kiên Hải',
                          val: activeMetrics.layer2.nhomE.boardNews,
                          color: 'bg-emerald-500',
                        },
                        {
                          label: 'Kêu gọi đầu tư',
                          val: activeMetrics.layer2.nhomE.investmentCalls,
                          color: 'bg-indigo-500',
                        },
                        {
                          label: 'Dự án',
                          val: activeMetrics.layer2.nhomE.projects,
                          color: 'bg-amber-500',
                        },
                        {
                          label: 'Điểm du lịch số',
                          val: activeMetrics.layer2.nhomE.tourismLocations,
                          color: 'bg-pink-500',
                        },
                        {
                          label: 'Thư viện tài liệu',
                          val: activeMetrics.layer2.nhomE.libraryDocs,
                          color: 'bg-purple-500',
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col sm:flex-row sm:items-center text-xs justify-between gap-1.5"
                        >
                          <span className="w-40 font-bold text-slate-300">
                            {item.label}
                          </span>
                          <div className="flex-1 flex items-center gap-3">
                            <div className="flex-1 bg-slate-900/60 h-2.5 rounded-full overflow-hidden border border-cyan-500/5">
                              <div
                                className={`h-full rounded-full ${item.color}`}
                                style={{ width: `${(item.val / 250) * 100}%` }}
                              ></div>
                            </div>
                            <span className="font-mono text-white font-bold w-12 text-right">
                              {item.val}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: AI COMMAND CENTER (Song song 2 Tầng & Soạn thảo quyết định) */}
          {activeTab === 'ai-command-center' && (
            <div className="bg-[#0A2540] border border-cyan-500/10 rounded-3xl p-6 flex flex-col gap-6 flex-1 min-h-[500px] animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-cyan-500/10 pb-4 gap-4">
                <div>
                  <h2 className="text-xl font-black text-cyan-400 flex items-center gap-2">
                    <Bot className="h-6 w-6 text-cyan-400" /> AI COMMAND CENTER
                  </h2>
                  <p className="text-xs text-slate-300">
                    Sử dụng mo hình ngôn ngữ lớn **Gemini-2.5-Flash** để tự động
                    đối chứng Tầng 1 (Chuẩn Phường/Xã 2.0) và Tầng 2 (Báo cáo
                    PDF) để phát hiện mâu thuẫn dữ liệu.
                  </p>
                </div>
                <span className="bg-purple-950/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/30">
                  gemini-2.5-flash-preview-09-2025
                </span>
              </div>

              {/* Feature 2: ✨ AI Policy Decree Generator Block */}
              <div className="bg-[#122A4E]/40 border border-cyan-500/20 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase flex items-center gap-1.5">
                      <Zap className="h-4.5 w-4.5 text-purple-400" />
                      <span>✨ AI DỰ THẢO CHỈ THỊ HÀNH ĐỘNG</span>
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Chọn điểm nghẽn nghiêm trọng dưới đây để Gemini tự động
                      soạn một văn bản chỉ thị chính thức của Đặc khu.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={selectedIssue}
                      onChange={(e) => setSelectedIssue(e.target.value)}
                      className="bg-slate-950 border border-cyan-500/30 text-xs rounded-xl p-2.5 font-bold text-white outline-none cursor-pointer"
                    >
                      <option value="nhom-c-training">
                        Khắc phục chỉ số Đào tạo số = 0 (Nhóm C - Tầng 2)
                      </option>
                      <option value="nhom-b-cloud">
                        Tăng tốc đưa 211 Doanh nghiệp lữ hành lên Cloud (Nhóm A
                        - Tầng 2)
                      </option>
                      <option value="nhom-b5-households">
                        Thúc đẩy số hóa 1.256 Hộ kinh doanh cá thể vượt mức 38%
                        (B5 - Tầng 1)
                      </option>
                    </select>

                    <button
                      onClick={handleGeneratePolicy}
                      disabled={isGeneratingPolicy}
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-95 transition-all text-white font-bold text-xs px-4 py-2.5 rounded-xl disabled:opacity-50"
                    >
                      <span>✨ SOẠN CHỈ THỊ</span>
                    </button>
                  </div>
                </div>

                {generatedPolicy && (
                  <div className="bg-[#07111F] p-4 rounded-xl border border-purple-500/20 text-xs font-mono space-y-3 relative overflow-hidden animate-in zoom-in-95 duration-200">
                    <div className="absolute top-2 right-2 flex items-center gap-2">
                      <button
                        onClick={() => handlePlayTTS(generatedPolicy)}
                        className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded-lg font-bold text-[10px] flex items-center gap-1"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                        <span>Nghe đọc</span>
                      </button>
                      <button
                        onClick={() => handleCopyClipboard(generatedPolicy)}
                        className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-2.5 py-1 rounded-lg font-bold text-[10px] flex items-center gap-1"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        <span>Sao chép</span>
                      </button>
                    </div>
                    <p className="whitespace-pre-wrap leading-relaxed text-slate-200">
                      {generatedPolicy}
                    </p>
                  </div>
                )}
              </div>

              {/* Chat View Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[300px]">
                {/* Chat box messages */}
                <div className="lg:col-span-8 flex flex-col bg-[#07111F]/50 border border-cyan-500/10 rounded-2xl overflow-hidden min-h-[300px]">
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[350px]">
                    {aiChatHistory.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-2.5 ${
                          msg.role === 'user' ? 'justify-end' : ''
                        }`}
                      >
                        {msg.role !== 'user' && (
                          <div className="bg-cyan-500 text-slate-900 p-1.5 rounded-lg shrink-0">
                            <Bot className="h-4.5 w-4.5" />
                          </div>
                        )}
                        <div
                          className={`max-w-[85%] rounded-2xl p-3 text-xs ${
                            msg.role === 'user'
                              ? 'bg-cyan-500 text-slate-900 font-bold rounded-tr-none'
                              : 'bg-[#122A4E]/50 text-slate-100 border border-cyan-500/10 rounded-tl-none leading-relaxed'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.text}</p>
                          <span
                            className={`block text-[9px] mt-1.5 text-right ${
                              msg.role === 'user'
                                ? 'text-slate-700'
                                : 'text-slate-400'
                            }`}
                          >
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                    {aiIsLoading && (
                      <div className="flex items-start gap-2.5">
                        <div className="bg-cyan-500 text-slate-900 p-1.5 rounded-lg animate-spin">
                          <RefreshCw className="h-4.5 w-4.5" />
                        </div>
                        <div className="bg-[#122A4E]/50 border border-cyan-500/10 rounded-2xl p-3 text-xs text-cyan-300">
                          <span className="flex items-center gap-1.5 animate-pulse">
                            AI đang đối chiếu dữ liệu giữa các mốc báo cáo 2
                            Tầng...
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-cyan-500/10 p-3 bg-[#0A2540]/20 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Hỏi AI về chiến lược hoặc giải pháp..."
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === 'Enter' && aiQuery && callGeminiAPI(aiQuery)
                      }
                      disabled={aiIsLoading}
                      className="flex-1 bg-slate-950/80 border border-cyan-500/20 text-xs text-white rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
                    />
                    <button
                      onClick={() => aiQuery && callGeminiAPI(aiQuery)}
                      disabled={aiIsLoading}
                      className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 p-3 rounded-xl"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Pre-made AI Analytics Prompts */}
                <div className="lg:col-span-4 flex flex-col gap-3">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    CÂU HỎI ĐỀ XUẤT
                  </span>

                  {[
                    'Phân tích mối quan hệ nhân quả giữa Tầng 1 (Chuẩn 2.0) và Tầng 2 (Báo cáo PDF).',
                    'Lập kế hoạch nâng cao tỷ lệ số hóa Hộ kinh doanh cá thể lên 60% trong Quý tới.',
                    'Tìm kiếm chênh lệch và mâu thuẫn thông số hạ tầng doanh nghiệp số giữa hai tầng.',
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setAiQuery(p);
                        callGeminiAPI(p);
                      }}
                      disabled={aiIsLoading}
                      className="text-left p-3 rounded-xl bg-[#122A4E]/30 hover:bg-[#122A4E]/50 border border-cyan-500/5 text-xs text-slate-200 transition-all flex items-start gap-2"
                    >
                      <ChevronRight className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
                      <span>{p}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Import PDF Periodic double-layer Modal */}
      {showPdfImportModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0A2540] border border-cyan-500/30 rounded-3xl p-6 max-w-xl w-full">
            <div className="flex items-center justify-between mb-4 border-b border-cyan-500/10 pb-3">
              <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Upload className="h-4.5 w-4.5" /> NẠP BÁO CÁO PDF ĐỊNH KỲ SONG
                HÀNH
              </h3>
              <button
                onClick={() => setShowPdfImportModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="border-2 border-dashed border-cyan-500/20 rounded-2xl p-8 text-center bg-slate-900/40">
                <Upload className="h-10 w-10 text-cyan-400 mx-auto mb-2" />
                <span className="text-sm font-bold block mb-1">
                  dashboard.pdf
                </span>
                <span className="text-xs text-slate-400">
                  Hệ thống đã đồng bộ thành công dữ liệu báo cáo PDF.
                </span>
              </div>

              <div className="flex gap-3 pt-3 border-t border-cyan-500/10">
                <button
                  onClick={() => setShowPdfImportModal(false)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl"
                >
                  Đóng
                </button>
                <button
                  onClick={handleImportNewPeriod}
                  className="flex-1 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-slate-900 text-xs font-bold rounded-xl"
                >
                  Nạp báo cáo song hành
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Area */}
      <footer className="bg-[#0A2540] border-t border-cyan-500/10 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 mt-auto text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>
            Hệ thống đồng bộ dữ liệu song song Đặc khu Kiên Hải theo chuẩn bảo
            mật IOC tỉnh An Giang.
          </span>
        </div>
        <div>
          <span>© 2026 Ban Chỉ Đạo Chuyển Đổi Số Đặc Khu Kiên Hải.</span>
        </div>
      </footer>
    </div>
  );
}

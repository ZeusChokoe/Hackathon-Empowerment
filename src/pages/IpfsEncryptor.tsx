import { useState } from "react";

async function encryptText(plain: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt","decrypt"]);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipherBuf = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(plain));
  const rawKey = await crypto.subtle.exportKey("raw", key);
  const keyHex = Array.from(new Uint8Array(rawKey)).map(b=>b.toString(16).padStart(2,"0")).join("");
  const ivHex = Array.from(iv).map(b=>b.toString(16).padStart(2,"0")).join("");
  return { cipher: new Blob([cipherBuf]), keyHex, ivHex };
}

async function uploadToWeb3Storage(blob: Blob, token: string, name = "encrypted.json") {
  const res = await fetch("https://api.web3.storage/upload", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "X-NAME": name
    },
    body: blob
  });
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
  const data = await res.json();
  return data?.cid as string;
}

export default function IpfsEncryptor() {
  const [jsonInput, setJsonInput] = useState<string>('{"message":"proof data"}');
  const [token, setToken] = useState<string>("");
  const [cid, setCid] = useState<string>("");
  const [keyHex, setKeyHex] = useState<string>("");
  const [ivHex, setIvHex] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleUpload = async () => {
    try {
      setLoading(true); setError("");
      const { cipher, keyHex, ivHex } = await encryptText(jsonInput);
      const cid = await uploadToWeb3Storage(cipher, token, "periodaid.enc");
      setCid(cid); setKeyHex(keyHex); setIvHex(ivHex);
    } catch (e:any) {
      setError(e?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Encrypted IPFS Uploader</h1>
      <p className="text-sm opacity-80">Encrypt JSON in-browser, upload to IPFS via web3.storage, and get a CID + a private key. Store only the CID on-chain.</p>
      <label className="block text-sm">JSON</label>
      <textarea className="w-full border rounded p-2 h-40 font-mono text-sm" value={jsonInput} onChange={e=>setJsonInput(e.target.value)} />
      <label className="block text-sm">WEB3_STORAGE_TOKEN</label>
      <input className="w-full border rounded p-2" placeholder="paste token" value={token} onChange={e=>setToken(e.target.value)} />
      <button onClick={handleUpload} disabled={loading || !token} className="px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-50">
        {loading ? "Uploading..." : "Encrypt & Upload"}
      </button>
      {error && <div className="p-2 bg-red-100 text-red-800 rounded">{error}</div>}
      {cid && (
        <div className="p-3 rounded border">
          <div className="text-sm">CID: <code>{cid}</code></div>
          <div className="text-sm mt-2">🔑 Save this key + IV securely (not on-chain):</div>
          <div className="text-xs font-mono break-all">key: {keyHex}</div>
          <div className="text-xs font-mono break-all">iv: {ivHex}</div>
        </div>
      )}
    </div>
  );
}

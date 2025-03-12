
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, X, FileText, File, Image as ImageIcon, Check, 
  Info, AlertCircle, Loader2
} from 'lucide-react';
import Layout from '@/components/layout/Layout';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  status: 'uploading' | 'success' | 'error' | 'processing';
  progress?: number;
  icon: React.ReactNode;
  errorMessage?: string;
}

const DocumentUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [documentType, setDocumentType] = useState('');
  const [productName, setProductName] = useState('');
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // File size formatter
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const newFiles: UploadedFile[] = Array.from(selectedFiles).map(file => {
      // Determine file icon based on type
      let icon;
      if (file.type.startsWith('image/')) {
        icon = <ImageIcon className="h-5 w-5" />;
      } else if (file.type === 'application/pdf') {
        icon = <FileText className="h-5 w-5" />;
      } else {
        icon = <File className="h-5 w-5" />;
      }

      return {
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        status: 'uploading',
        progress: 0,
        icon
      };
    });

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload process for each file
    newFiles.forEach(file => {
      simulateFileUpload(file.id);
    });

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Simulate file upload process
  const simulateFileUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      
      if (progress >= 100) {
        clearInterval(interval);
        progress = 100;
        
        // Simulate processing stage
        setTimeout(() => {
          setFiles(prev => prev.map(file => {
            if (file.id === fileId) {
              return { ...file, status: 'processing', progress: 100 };
            }
            return file;
          }));
          
          // Simulate completion or error
          setTimeout(() => {
            setFiles(prev => prev.map(file => {
              if (file.id === fileId) {
                // Randomly decide success or error (90% success rate)
                const isSuccess = Math.random() > 0.1;
                return { 
                  ...file, 
                  status: isSuccess ? 'success' : 'error',
                  errorMessage: isSuccess ? undefined : 'Invalid document format'
                };
              }
              return file;
            }));
          }, 1500);
        }, 500);
      }
      
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          return { ...file, progress };
        }
        return file;
      }));
    }, 200);
  };

  // Remove file from list
  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!documentType) {
      toast({
        title: "Document type required",
        description: "Please select a document type.",
        variant: "destructive"
      });
      return;
    }
    
    if (!productName) {
      toast({
        title: "Product name required",
        description: "Please enter a product name.",
        variant: "destructive"
      });
      return;
    }
    
    if (files.length === 0) {
      toast({
        title: "No files uploaded",
        description: "Please upload at least one document.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if any files are still uploading or have errors
    const uploading = files.some(file => file.status === 'uploading' || file.status === 'processing');
    const hasErrors = files.some(file => file.status === 'error');
    
    if (uploading) {
      toast({
        title: "Upload in progress",
        description: "Please wait for all files to finish uploading.",
        variant: "destructive"
      });
      return;
    }
    
    if (hasErrors) {
      toast({
        title: "Failed uploads",
        description: "Please remove or replace files with errors.",
        variant: "destructive"
      });
      return;
    }
    
    // Process the submission
    toast({
      title: "Documents submitted successfully",
      description: `${files.length} documents uploaded for ${productName}.`,
      variant: "default"
    });
    
    // Reset form
    setFiles([]);
    setDocumentType('');
    setProductName('');
  };

  return (
    <Layout>
      <div className="container max-w-3xl animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Document Upload</h1>
          <p className="text-muted-foreground">
            Upload warranty documents for processing
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>
                Upload your warranty-related documents for automated processing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Document Type */}
              <div className="space-y-2">
                <Label htmlFor="document-type">Document Type</Label>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger id="document-type">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="receipt">Receipt / Proof of Purchase</SelectItem>
                    <SelectItem value="warranty-card">Warranty Card</SelectItem>
                    <SelectItem value="service-report">Service Report</SelectItem>
                    <SelectItem value="product-registration">Product Registration</SelectItem>
                    <SelectItem value="damage-evidence">Damage Evidence</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input 
                  id="product-name" 
                  placeholder="e.g., MacBook Pro 16-inch (2023)"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              
              {/* File Upload Area */}
              <div className="space-y-4">
                <Label>Document Files</Label>
                
                {/* Upload area */}
                <div 
                  className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFileSelect}
                  />
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium">Drag and drop your files</h3>
                    <p className="text-sm text-muted-foreground">
                      Supports PDF, JPG, PNG, and other common formats up to 10 MB
                    </p>
                    <Button type="button" variant="outline" size="sm" className="mt-2">
                      Browse Files
                    </Button>
                  </div>
                </div>
                
                {/* File list */}
                {files.length > 0 && (
                  <div className="space-y-2 mt-4">
                    {files.map((file) => (
                      <div key={file.id} className="flex items-center p-3 border rounded-md">
                        <div className="h-9 w-9 rounded bg-accent flex items-center justify-center">
                          {file.icon}
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm truncate">{file.name}</p>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile(file.id);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{file.size}</span>
                            <span className="mx-2">•</span>
                            
                            {file.status === 'uploading' && (
                              <>
                                <Loader2 className="animate-spin h-3 w-3 mr-1" />
                                <span>Uploading {file.progress}%</span>
                                <div className="w-full bg-accent h-1 rounded-full mt-1">
                                  <div 
                                    className="bg-primary h-1 rounded-full transition-all" 
                                    style={{ width: `${file.progress}%` }}
                                  ></div>
                                </div>
                              </>
                            )}
                            
                            {file.status === 'processing' && (
                              <>
                                <Loader2 className="animate-spin h-3 w-3 mr-1" />
                                <span>Processing...</span>
                              </>
                            )}
                            
                            {file.status === 'success' && (
                              <>
                                <Check className="h-3 w-3 mr-1 text-green-500" />
                                <span className="text-green-500">Upload complete</span>
                              </>
                            )}
                            
                            {file.status === 'error' && (
                              <>
                                <AlertCircle className="h-3 w-3 mr-1 text-destructive" />
                                <span className="text-destructive">{file.errorMessage || 'Upload failed'}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Help text */}
                <div className="flex items-start gap-2 p-3 bg-accent/50 rounded text-sm">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Document requirements:</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-muted-foreground">
                      <li>Make sure documents are clearly visible and all text is readable</li>
                      <li>Include all pages of multi-page documents</li>
                      <li>Ensure the document shows the product name, purchase date, and price</li>
                      <li>For warranty cards, ensure the serial number is visible</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => {
                setFiles([]);
                setDocumentType('');
                setProductName('');
              }}>
                Cancel
              </Button>
              <Button type="submit">Submit Documents</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </Layout>
  );
};

export default DocumentUpload;

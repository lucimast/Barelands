"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  FiImage,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiFilter
} from "react-icons/fi";
import { photos as initialPhotos } from "@/lib/data";
import { requireAuth } from "@/lib/auth.utils";

export default function ManagePhotos() {
  const [photos, setPhotos] = useState(initialPhotos);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const filteredPhotos = photos.filter(photo =>
    photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    photo.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    photo.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (id: string) => {
    setSelectedPhotoId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPhotoId) {
      setPhotos(photos.filter(photo => photo.id !== selectedPhotoId));
      toast.success("Photo deleted successfully!");
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-red-500">Manage Photos</h1>
          <p className="text-zinc-400">
            Upload, edit, and organize your portfolio photographs
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button asChild className="bg-white text-zinc-900 hover:bg-zinc-200">
            <Link href="/admin/photos/upload">
              <FiPlus className="mr-2 h-4 w-4" /> Add New Photo
            </Link>
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <FiSearch className="absolute left-3 top-3 text-zinc-400" />
          <Input
            className="pl-10 bg-zinc-800 border-zinc-700"
            placeholder="Search by title, category, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="border-zinc-700 text-zinc-400">
          <FiFilter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <Card
            key={photo.id}
            className="bg-zinc-800 border-zinc-700 overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-zinc-900/60 hover:bg-zinc-800 h-8 w-8"
                  asChild
                >
                  <Link href={`/admin/photos/edit/${photo.id}`}>
                    <FiEdit2 className="h-4 w-4 text-zinc-200" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-zinc-900/60 hover:bg-red-900/60 h-8 w-8"
                  onClick={() => handleDeleteClick(photo.id)}
                >
                  <FiTrash2 className="h-4 w-4 text-zinc-200" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-white">{photo.title}</h3>
              <p className="text-sm text-zinc-400 mb-2">{photo.location}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs bg-zinc-700 px-2 py-1 rounded-full text-zinc-300">
                  {photo.category}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-zinc-400 hover:text-white p-0"
                  asChild
                >
                  <Link href={`/admin/photos/${photo.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No results state */}
      {filteredPhotos.length === 0 && (
        <div className="text-center py-12 bg-zinc-800/30 rounded-lg border border-zinc-700 mt-6">
          <FiImage className="mx-auto h-12 w-12 text-zinc-600 mb-4" />
          <h3 className="text-lg font-medium text-zinc-300">No photos found</h3>
          <p className="text-zinc-500 mb-6">
            {searchQuery
              ? "Try adjusting your search terms"
              : "You haven't added any photos yet"}
          </p>
          {!searchQuery && (
            <Button asChild>
              <Link href="/admin/photos/upload">
                <FiPlus className="mr-2 h-4 w-4" /> Add your first photo
              </Link>
            </Button>
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-700">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this photo? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end pt-4">
            <Button
              variant="outline"
              className="border-zinc-700"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
